# pip install git+https://git@github.com/SKTBrain/KoBERT.git@master
# pip install transformers
# pip install SentencePiece
# pip install mxnet
# pip install gluonnlp==0.8.0 # 일반 버전 0.10.0은 파이썬 3.10에서 에러남
# pip install torch
# pip uninstall numpy => pip install numpy==1.23.0
import torch
from torch import nn

import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
# from tqdm import tqdm, tqdm_notebook

#kobert
from kobert.utils import get_tokenizer
from kobert.pytorch_kobert import get_pytorch_kobert_model

if torch.cuda.is_available():
    print('-----------cuda---------------')
    device = torch.device("cuda:0")
else:
    print('-----------cpu---------------')
    device = torch.device("cpu")

bertmodel, vocab = get_pytorch_kobert_model()


class BERTDataset(Dataset):
    def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer, max_len,
                 pad, pair):
        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len, pad=pad, pair=pair)

        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return (self.sentences[i] + (self.labels[i], ))

    def __len__(self):
        return (len(self.labels))


class BERTClassifier(nn.Module):
    def __init__(self,
                 bert,
                 hidden_size = 768,
                 num_classes=6,
                 dr_rate=None,
                 params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate

        self.classifier = nn.Linear(hidden_size , num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)

    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()
    
    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)

        _, pooler = self.bert(input_ids = token_ids, token_type_ids = segment_ids.long(), attention_mask = attention_mask.float().to(token_ids.device))
        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)

# Setting parameters
max_len = 128  
batch_size = 64 
warmup_ratio = 0.1 
num_epochs = 30  
max_grad_norm = 1  
log_interval = 200
learning_rate =  5e-5 

# load trained model
PATH = 'model/'
# model = torch.load(PATH + 'result_model.pt')
model = BERTClassifier(bertmodel, dr_rate=0.5).to(device)
# model.load_state_dict(torch.load(PATH + 'model_state_dict.pt', map_location=device))  # state_dict를 불러 온 후, 모델에 저장 => 에러발생
# state_dict에서 예상치 못한 key인 "bert.embeddings.position_ids"를 제거한 후 모델을 로드
state_dict = torch.load(PATH + 'model_state_dict.pt', map_location=device)
if "bert.embeddings.position_ids" in state_dict:
    del state_dict["bert.embeddings.position_ids"]
model.load_state_dict(state_dict)

# tokenize
tokenizer = get_tokenizer()
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

def predict(predict_sentence):
    data = [predict_sentence, '0']
    dataset_another = [data]
    print('--------------dataset_another----------------', dataset_another)

    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    print('--------------BERTDataset----------------',  BERTDataset)
    # test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=5)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size,  num_workers=0, pin_memory=False)

    model.eval()
    print('--------------model----------------')

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)

        valid_length= valid_length
        label = label.long().to(device)

        out = model(token_ids, valid_length, segment_ids)
        print('--------------out----------------', out)

        test_eval=[]
        for i in out:
            logits=i
            logits = logits.detach().cpu().numpy()
            logits = np.exp(logits) / np.sum(np.exp(logits), axis=0)
            
            if np.argmax(logits) == 0:
                test_eval.append(f"구진/플라크 ----- {logits[0]}")
            elif np.argmax(logits) == 1:
                test_eval.append(f"비듬/각질/상피성잔고리 ----- {logits[1]}")
            elif np.argmax(logits) == 2:
                test_eval.append(f"태선화/과다색소침착 ----- {logits[2]}")
            elif np.argmax(logits) == 3:
                test_eval.append(f"농포/여드름 ----- {logits[3]}")
            elif np.argmax(logits) == 4:
                test_eval.append(f"미란/궤양 ----- {logits[4]}")
            elif np.argmax(logits) == 5:
                test_eval.append(f"결절/종괴 ----- {logits[5]}")

        print(test_eval[0])

    return test_eval[0]