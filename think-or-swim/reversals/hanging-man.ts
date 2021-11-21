input price_point = close;
input length = 5;
input short_ema_length = 4;
input long_ema_length = 10;

def lower_shadow_height = Min(open, close) - low;
def upper_shadow_height = high - Max(open, close);

def hammer_body =  BodyHeight() <= lower_shadow_height / 2;
def hammer_upper_shadow = upper_shadow_height <= BodyHeight() / 3;
def not_a_doji = close != open;

def uptrend = ExpAverage(low,short_ema_length)[1] > ExpAverage(low,long_ema_length)[1];; 

plot hanging_man;
hanging_man = hammer_body && hammer_upper_shadow && not_a_doji && uptrend ;
hanging_man.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);

AddLabel(if hanging_man then yes else no, "Hanging Man");
AddChartBubble(hanging_man is true,high + (high - low),"HM",Color.RED,yes);
