declare lower;

def earnings_per_share_ttm = if (!isNan(EarningsPerShareTTM())) 
    then EarningsPerShareTTM()
    else Double.NaN;

def earnings_per_share_ttm_previous = if (!isNan(earnings_per_share_ttm))
    then earnings_per_share_ttm[1] 
    else Double.NaN;

plot earnings_growth = if (!isNan(earnings_per_share_ttm_previous))
    then 100 * (earnings_per_share_ttm - earnings_per_share_ttm_previous) / earnings_per_share_ttm_previous 
    else Double.NaN;

