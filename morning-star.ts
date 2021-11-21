input short_ema_length = 3;
input long_ema_length = 20;

input scaling_factor= 0.5;
input length = 20;
def average_body_height = Average(BodyHeight(),length);
def body_height_std_dev = StDev(BodyHeight(),length);

def small_body = BodyHeight() < average_body_height - scaling_factor *  body_height_std_dev;
def strong_body = BodyHeight() >  average_body_height + scaling_factor *  body_height_std_dev;

def spinning_top = small_body;


def body_top = Max(open, close);
def body_bottom = Min(open, close);
def upper_shadow = high - body_top;
def lower_shadow = body_bottom - low;
def black_real_body =  close - open < 0;
def white_real_body = close - open > 0;

def black_first_real_body = black_real_body[2];
def strong_black_first_real_body = strong_body[2] and black_real_body[2];

def opened_lower_on_second_day = open[1] < close[2];
def second_day_closed_below_first_days_close = close[1] < close[2];

def downtrend_on_first_day =  ExpAverage(low, short_ema_length)[2] < ExpAverage(low, long_ema_length)[2];
def downtrend_yesterday =  ExpAverage(low, short_ema_length)[1] < ExpAverage(low, long_ema_length)[1];
def second_day_was_spinning_top = spinning_top[1];
def it_was_in_a_downtrend = downtrend_yesterday or downtrend_on_first_day  ;

def third_day_had_strong_white_real_body = strong_body and white_real_body;

plot morning_star = strong_black_first_real_body
    and second_day_was_spinning_top
    and opened_lower_on_second_day 
    and second_day_closed_below_first_days_close
    and third_day_had_strong_white_real_body
    and it_was_in_a_downtrend;

def up_arrow = PaintingStrategy.BOOLEAN_ARROW_UP;
morning_star.SetPaintingStrategy(up_arrow);

AddLabel(if morning_star then yes else no, "Morning Star");
AddChartBubble( morning_star is true, Min(low,low[1]) - (high - low), "MS", Color.GREEN, no);
