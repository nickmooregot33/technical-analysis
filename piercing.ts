input short_ema_length = 3;
input long_ema_length = 20;

def body_size = AbsValue(open - close);
def strong_body = body_size > Average(body_size, 20)[1];
def black_real_body = close - open < 0;
def strong_black_real_body_yesterday = strong_body[1] and black_real_body[1];

def opened_lower_than_yesterdays_low = open < low[1];
def closed_deeper_than_fifty_percent_into_prior_days_body = close > ( close[1] + open[1]) / 2;
def it_isnt_engulfing = close < open[1];

def downtrend_yesterday =  ExpAverage(low, short_ema_length)[1] < ExpAverage(low, long_ema_length)[1];
def downtrend_today =  ExpAverage(low, short_ema_length) < ExpAverage(low, long_ema_length);

def it_was_in_a_downtrend = downtrend_yesterday or downtrend_today ;

plot piercing = strong_black_real_body_yesterday
    and opened_lower_than_yesterdays_low 
    and closed_deeper_than_fifty_percent_into_prior_days_body
    and it_was_in_a_downtrend
    and it_isnt_engulfing;

def up_arrow = PaintingStrategy.BOOLEAN_ARROW_UP;
piercing.SetPaintingStrategy(up_arrow);

AddLabel(if piercing then yes else no, "Piercing");
AddChartBubble( piercing is true, low - (high - low), "P", Color.GREEN, no);
