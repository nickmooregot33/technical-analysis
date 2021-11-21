input short_ema_length = 3;
input long_ema_length = 20;

def body_size = AbsValue(open - close);
def strong_body = body_size > Average(body_size, 20)[1];
def white_real_body = close - open > 0;
def strong_white_real_body_yesterday = strong_body[1] and white_real_body[1];

def opened_higher_than_yesterdays_high = open > high[1];
def closed_deeper_than_fifty_percent_into_prior_days_body = close < ( close[1] + open[1]) / 2;
def it_isnt_engulfing = close > open[1];

def uptrend_yesterday =  ExpAverage(low,short_ema_length)[1] > ExpAverage(low,long_ema_length)[1];
def uptrend_today =  ExpAverage(low,short_ema_length) > ExpAverage(low,long_ema_length);

def it_was_in_an_uptrend = uptrend_yesterday or uptrend_today ;

plot classic_dark_cloud_cover = strong_white_real_body_yesterday
    and opened_higher_than_yesterdays_high 
    and closed_deeper_than_fifty_percent_into_prior_days_body
    and it_was_in_an_uptrend
    and it_isnt_engulfing;

def down_arrow = PaintingStrategy.BOOLEAN_ARROW_DOWN;
classic_dark_cloud_cover.SetPaintingStrategy(down_arrow);

AddLabel(if classic_dark_cloud_cover then yes else no, "Classic Dark Cloud Cover");
AddChartBubble(classic_dark_cloud_cover is true,high + (high - low),"DCC",Color.Red,yes);
