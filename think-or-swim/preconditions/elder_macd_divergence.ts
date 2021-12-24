# this was copied from someone one the thinkscript site, whose code I don not trust.  I may have modified it afterwards.
# This is definitely in need of reworking.  I do not believe it works

input bar = 2;

input fastLength = 12;

input slowLength = 26;

input MACDLength = 9;

input averageType = AverageType.EXPONENTIAL;

plot macd_diff = MACD(fastLength, slowLength, MACDLength, averageType).Diff;

def lowBar = if low == lowest(low,20) then BarNumber() else lowBar[1];

def highest_trailing = macd_diff > 0 and macd_diff >= highest(macd_diff[1], bar);

def highest_leading =  macd_diff > 0 and macd_diff >= highest(macd_diff[-1], bar);

def lowest_trailing =  macd_diff < 0 and macd_diff <= lowest(macd_diff[1], bar);

def lowest_leading  =  macd_diff < 0 and macd_diff <= lowest(macd_diff[-1], bar);

def swing_high = highest_trailing and highest_leading;
def swing_low = lowest_trailing and lowest_leading;



plot lowest = lowBar;  # looks like BarNumber is always increasing.  Not sure how barnumber is helpful

# possible bearish divergence would be MACD is lower than the highest point but we have bearish signal (candles or patterns) and the slope of the macd is flattish or something, but the high is currently the highest of the same range?

