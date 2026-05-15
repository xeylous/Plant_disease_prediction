"""
39 plant disease class labels in the exact order used during model training.
Includes helper to parse label into crop name and disease name.
"""

CLASS_LABELS = [
    'Apple___Apple_scab',
    'Apple___Black_rot',
    'Apple___Cedar_apple_rust',
    'Apple___healthy',
    'Background_without_leaves',
    'Blueberry___healthy',
    'Cherry___Powdery_mildew',
    'Cherry___healthy',
    'Corn___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn___Common_rust',
    'Corn___Northern_Leaf_Blight',
    'Corn___healthy',
    'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot',
    'Peach___healthy',
    'Pepper,_bell___Bacterial_spot',
    'Pepper,_bell___healthy',
    'Potato___Early_blight',
    'Potato___Late_blight',
    'Potato___healthy',
    'Raspberry___healthy',
    'Soybean___healthy',
    'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch',
    'Strawberry___healthy',
    'Tomato___Bacterial_spot',
    'Tomato___Early_blight',
    'Tomato___Late_blight',
    'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy',
]


def parse_class_label(label: str) -> dict:
    """
    Parse a raw class label into structured crop/disease info.

    Example:
        'Tomato___Late_blight' -> {'crop': 'Tomato', 'disease': 'Late blight', 'healthy': False}
        'Apple___healthy'      -> {'crop': 'Apple', 'disease': 'Healthy', 'healthy': True}
    """
    if label == 'Background_without_leaves':
        return {"crop": "Unknown", "disease": "No leaf detected", "healthy": False}

    parts = label.split('___')
    if len(parts) != 2:
        return {"crop": "Unknown", "disease": label, "healthy": False}

    crop = parts[0].replace('_', ' ').replace(',', ', ')
    disease_raw = parts[1]

    is_healthy = disease_raw.lower() == 'healthy'
    disease = "Healthy" if is_healthy else disease_raw.replace('_', ' ')

    return {"crop": crop, "disease": disease, "healthy": is_healthy}
