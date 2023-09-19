from PIL import Image
import io
import torch

def get_yolov5(species, specific_model):
    model = torch.hub.load('ultralytics/yolov5', 'custom', path=f'model/{species}/{specific_model}/best.pt')
    model.conf = 0.2
    return model

def get_image_from_bytes(binary_image, max_size=1920):
    input_image =Image.open(io.BytesIO(binary_image)).convert("RGB")
    width, height = input_image.size
    resize_factor = min(max_size / width, max_size / height)
    resized_image = input_image.resize((
        int(input_image.width * resize_factor),
        int(input_image.height * resize_factor)
    ))
    return resized_image

# def detect(file):
#     # model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt')
#     model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
#     input_image =Image.open(io.BytesIO(file)).convert("RGB")
#     results = model(input_image)
#     print(results)
#     # results_json = json.loads(results.pandas().xyxy[0].to_json(orient="records"))

#     return 'results_json'




    # results.render()  # 출력된 결과의 이미지 사용할 수 있게 변환 (np.array 형식으로 변환)


    # static_folder = 'media/'
    # inferenced_img_dir = os.path.join(
    #     static_folder, "inferenced_image")  # 디텍트 이미지 저장경로

    # if not os.path.exists(inferenced_img_dir):
    #     os.makedirs(inferenced_img_dir)

    # for img in results.ims:  # np.array 형식
    #     img_base64 = I.fromarray(img)  # 이미지 형식
    #     img_base64.save(f"{inferenced_img_dir}/{img_name}")

    # res_url = "inferenced_image"+"/" + img_name  # 객체 검출 결과 이미지 저장 경로
    
    # return res_url
