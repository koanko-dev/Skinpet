from PIL import Image
import io
import torch

def get_yolov5(species, specific_model='NONE'):
    cat_disease_ls = ["A2_비듬_각질_상피성잔고리", "A4_농포_여드름", "A6_결절_종괴"]
    dog_disease_ls = ["A1_구진_플라크", "A2_비듬_각질_상피성잔고리", "A3_태선화_과다색소침착", "A4_농포_여드름", "A5_미란_궤양", "A6_결절_종괴"]
    models = []
    if specific_model == 'NONE':
        if species == 'cat':
            for cat_disease in cat_disease_ls:
                model = torch.hub.load('ultralytics/yolov5', 'custom', path=f'model/{species}/{cat_disease}/best.pt')
                model.conf = 0.2
                models.append(model)
        else:
            for dog_disease in dog_disease_ls:
                model = torch.hub.load('ultralytics/yolov5', 'custom', path=f'model/{species}/{dog_disease}/best.pt')
                model.conf = 0.2
                models.append(model)
    else:
        model = torch.hub.load('ultralytics/yolov5', 'custom', path=f'model/{species}/{specific_model}/best.pt')
        model.conf = 0.2
        models.append(model)
    return models

def get_image_from_bytes(binary_image, max_size=1920):
    input_image =Image.open(io.BytesIO(binary_image)).convert("RGB")
    width, height = input_image.size
    resize_factor = min(max_size / width, max_size / height)
    resized_image = input_image.resize((
        int(input_image.width * resize_factor),
        int(input_image.height * resize_factor)
    ))
    return resized_image
