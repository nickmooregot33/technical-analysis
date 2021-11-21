input price_point1 = close;
input price_point2 = open;
input length = 6;
input short_ema_length = 4;
input long_ema_length = 20;

def opened_higher = open >= close[1];
def closed_lower = close < open[1];

def yesterday_was_up = close[1] > open[1];

def uptrend_yesterday = ExpAverage(high,short_ema_length)[1] > ExpAverage(high,long_ema_length)[1];
def uptrend_today = ExpAverage(high,short_ema_length) > ExpAverage(high,long_ema_length);
def uptrend = uptrend_yesterday or uptrend_today;

plot bearish_engulfing;
bearish_engulfing = opened_higher && closed_lower && uptrend && yesterday_was_up;
bearish_engulfing.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);

AddLabel(if bearish_engulfing then yes else no, "Classic Bearish Engulfing Pattern");

AddChartBubble(bearish_engulfing is true,high + (high - low),"BE",Color.Red,yes);
