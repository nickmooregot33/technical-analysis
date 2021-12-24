def ema =  ExpAverage(close,13);
def macd_histogram = MACDHistogram().diff;

def down_day = open > close;
def up_day = open < close;

def upward_sloping_ema = ema[0] - ema[1]> 0;
def downward_sloping_ema =  ema[0] - ema[1] < 0;

def downward_sloping_macd_h = macd_histogram[0] < macd_histogram[1];
def upward_sloping_macd_h =  macd_histogram[0] > macd_histogram[1];

def bulls_in_charge = upward_sloping_ema and upward_sloping_macd_h;
def bears_in_charge = downward_sloping_ema and downward_sloping_macd_h;
plot impulse =  if bulls_in_charge then 1 else if bears_in_charge then -1 else 0;

AssignPriceColor(if bulls_in_charge and up_day then Color.GREEN 
                  else if bulls_in_charge and down_day then Color.RED
                  else if bears_in_charge and up_day then Color.BLUE
                  else if bears_in_charge and down_day then Color.ORANGE
                  else if up_day then Color.WHITE
                  else Color.BLACK
);

# green for white candles when bulls are in charge
# red for black candles when bulls are in charge

# blue for white candles when bears are in charge
# orange for black candles when bears are in charge

# otherwise, normal style colors apply otherwise, normal style colors apply
