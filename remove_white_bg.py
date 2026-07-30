import os
from PIL import Image

logo_dir = r"c:\Users\Saideep\OneDrive\Desktop\Assanj Internship\iDecorwala\IDECORWALA-main\idecorwala-enterprise\public\logos"

def remove_white_bg(img_path, out_path):
    try:
        img = Image.open(img_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Change all white (also shades of whites)
            # pixels to transparent
            if item[0] > 230 and item[1] > 230 and item[2] > 230:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(out_path, "PNG")
        print(f"Processed: {os.path.basename(img_path)} -> {os.path.basename(out_path)}")
        return True
    except Exception as e:
        print(f"Error processing {img_path}: {e}")
        return False

# Target problematic logos with solid backgrounds based on previous code mapping
targets = ["radisson.jpg", "accor.jpg", "sarovar.jpg", "synergy.jpg", "sp-infocity.webp", "colliers.jpg", "hettich.jpg"]
for f in os.listdir(logo_dir):
    if f.lower().endswith('.jpg') or f.lower().endswith('.jpeg') or f.lower().endswith('.webp'):
        if f not in targets:
            targets.append(f)

for target in targets:
    in_path = os.path.join(logo_dir, target)
    if os.path.exists(in_path):
        out_name = os.path.splitext(target)[0] + ".png"
        out_path = os.path.join(logo_dir, out_name)
        remove_white_bg(in_path, out_path)
