eval "$(conda shell.bash hook)"
conda activate yolov4-cpu
python ../yolov4/detect.py --weights ../yolov4/checkpoints/yolov4-416 --size 416 --model yolov4 --images ../yolov4/data/images/lady.jpeg