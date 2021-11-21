input price_point1 = close;
input price_point2 = open;
input length = 6;
input short_ema_length = 4;
input long_ema_length = 20;

def opened_lower = open <= close[1];
def closed_higher = close > open[1];

def yesterday_was_down = close[1] < open[1];

def downward_sloping = IsDescending(price_point1, length)[1] && 
    IsDescending(price_point1, length)[1];

def downtrend_yesterday = ExpAverage(high,short_ema_length)[1] < ExpAverage(high,long_ema_length)[1];
def downtrend_today = ExpAverage(high,short_ema_length) < ExpAverage(high,long_ema_length);
def downtrend = downtrend_yesterday or downtrend_today;

plot bullish;
bullish = opened_lower && closed_higher && downtrend && yesterday_was_down;
bullish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

AddLabel(if bullish then yes else no, "Classic Bullish Engulfing Pattern");

AddChartBubble(bullish is true,low - (high - low),"BE",Color.Green,no);
