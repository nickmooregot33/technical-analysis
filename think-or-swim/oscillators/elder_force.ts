input ema_length = 2;

plot efi = Volume * (close[0] - close[1]);

plot ema = ExpAverage(efi,ema_length);
