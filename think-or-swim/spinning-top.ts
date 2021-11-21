input scaling_factor= 0.5;
input length = 20;

def average_body_height = Average(BodyHeight(),length);
def body_height_std_dev = StDev(BodyHeight(),length);
def small_body = BodyHeight() < average_body_height - scaling_factor *  body_height_std_dev;

plot spinning_top = small_body;

assignPriceColor(if spinning_top then Color.RED else Color.WHITE);

