declare lower;

def earnings_per_share_ttm = if (!IsNaN(EarningsPerShareTTM())) 
    then EarningsPerShareTTM()
    else Double.NaN;

def earnings_per_share_ttm_previous = if (!IsNaN(earnings_per_share_ttm))
    then earnings_per_share_ttm[1] 
    else Double.NaN;


plot price_to_earnings = if (!IsNaN(earnings_per_share_ttm)) 
    then close / earnings_per_share_ttm 
    else Double.NaN;
