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


def strong_white_first_real_body = strong_body[2] and white_real_body[2];

def opened_higher_on_second_day = open[1] > close[2];
def second_day_closed_above_first_days_close = close[1] > close[2];

def uptrend_on_first_day =  ExpAverage(low, short_ema_length)[2] > ExpAverage(low, long_ema_length)[2];
def uptrend_yesterday =  ExpAverage(low, short_ema_length)[1] > ExpAverage(low, long_ema_length)[1];
def second_day_was_spinning_top = spinning_top[1];
def it_was_in_a_uptrend = uptrend_yesterday or uptrend_on_first_day  ;

def third_day_had_strong_black_real_body = strong_body and black_real_body;

plot evening_star = strong_white_first_real_body
    and second_day_was_spinning_top
    and opened_higher_on_second_day 
    and second_day_closed_above_first_days_close
    and third_day_had_strong_black_real_body
    and it_was_in_a_uptrend;

def down_arrow = PaintingStrategy.BOOLEAN_ARROW_DOWN;
evening_star.SetPaintingStrategy(down_arrow);

AddLabel(if evening_star then yes else no, "Evening Star");
AddChartBubble( evening_star is true, Min(high,high[1]) + (high - low), "ES", Color.RED, yes);
