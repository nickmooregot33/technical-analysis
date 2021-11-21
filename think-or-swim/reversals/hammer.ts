input price_point = close;
input length = 5;
input short_ema_length = 4;
input long_ema_length = 10;

def lower_shadow_height = Min(open, close) - low;
def upper_shadow_height = high - Max(open, close);

def hammer_body =  BodyHeight() <= lower_shadow_height / 2;
def hammer_upper_shadow = upper_shadow_height <= BodyHeight() / 3;
def not_a_doji = close != open;

def downtrend = ExpAverage(high,short_ema_length)[1] < ExpAverage(high,long_ema_length)[1];; 

plot hammer;
hammer = hammer_body && hammer_upper_shadow && not_a_doji && downtrend ;
hammer.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

AddLabel(if hammer then yes else no, "Hammer");
AddChartBubble(hammer is true,low - (high - low),"H",Color.Green,no);
