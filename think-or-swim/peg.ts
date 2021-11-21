
declare lower;

input length = 5;


def earnings_per_share_ttm = GetActualEarnings();
def earnings = if HasEarnings() then Sum(earnings_per_share_ttm,4) else earnings[1];
def price_to_earnings = close / earnings[0];

def year_over_year =  (earnings - earnings[4]) / earnings[4];

def average_growth_five_years = (year_over_year + year_over_year[4] + year_over_year[8] + year_over_year[12] + year_over_year[16]) / 5;

def average_growth_ten_years =  (year_over_year + year_over_year[4] + year_over_year[8] + year_over_year[12] + year_over_year[16] + year_over_year[20] + year_over_year[24] + year_over_year[28] + year_over_year[32] + year_over_year[36]) / 10;

#def growth = if (length equals 10) then average_growth_ten_years else average_growth_five_years;

#def peg = price_to_earnings /(100 * growth);

plot five_year_peg =  price_to_earnings /(100 * average_growth_five_years);
plot ten_year_peg =  price_to_earnings /(100 * average_growth_ten_years);
#plot solid_fundamentals = 0 < peg and peg < 1;
#plot earnings_per_share_ttm = GetActualEarnings();
#def earnings = if HasEarnings() then Sum(earnings_per_share_ttm,4) else earnings[1];
#plot earnings_call = earnings;


#def earnings_per_share_ttm_previous = if (!isNan(earnings_per_share_ttm))
#    then earnings_per_share_ttm[12] 
#    else Double.NaN;

#def earnings_growth = if (!isNan(earnings_per_share_ttm_previous))
#    then 100 * (earnings_per_share_ttm - earnings_per_share_ttm_previous) / earnings_per_share_ttm_previous 
#    else Double.NaN;

#def growth = Average(earnings_growth,10);

#def price_to_earnings = if (!isNan(earnings_per_share_ttm)) 
#    then close / earnings_per_share_ttm 
#    else Double.NaN;

#plot peg = if (!isNan(growth))
#    then price_to_earnings / growth 
#    else Double.NaN;


#######################################################
#
#              PEG SCANNER
#
#######################################################
#declare lower;

#def earnings_per_share_ttm = GetActualEarnings();
#def earnings = if HasEarnings() then Sum(earnings_per_share_ttm,4) else earnings[1];
#def price_to_earnings = close / earnings[0];

#def growth = Average(100 * (earnings - earnings[4]) / earnings[4],20);


#plot peg = price_to_earnings / growth;
