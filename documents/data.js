// data file containing the past data
var years = [ 1960,	1961,	1962,	1963,	1964,	1965,	1966,	1967,	1968,	1969,	1970,	1971,	1972,	1973,	1974,	1975,	1976,	1977,	1978,	1979,	1980,	1981,	1982,	1983,	1984,	1985,	1986,	1987,	1988,	1989,	1990,	1991,	1992,	1993,	1994,	1995,	1996,	1997,	1998,	1999,	2000,	2001,	2002,	2003,	2004,	2005,	2006,	2007,	2008,	2009,	2010,	2011,	2012,	2013,	2014,	2015,	2016,	2017,	2018,	2019,	2020,	2021,	2022,	2023,	2024,	2025,	2026,	2027,	2028,	2029,	2030,	2031,	2032,	2033,	2034,	2035,	2036,	2037,	2038,	2039,	2040,	2041,	2042,	2043,	2044,	2045,	2046,	2047,	2048,	2049,	2050] ;
var futurYears = [ 2016,	2017,	2018,	2019,	2020,	2021,	2022,	2023,	2024,	2025,	2026,	2027,	2028,	2029,	2030,	2031,	2032,	2033,	2034,	2035,	2036,	2037,	2038,	2039,	2040,	2041,	2042,	2043,	2044,	2045,	2046,	2047,	2048,	2049,	2050] ;

var prod_nucl = [       0,	    0,	    0,	    0,	    0,	0,	0,	0,	0,	563,	1850,	1843,	4650,	5896,	6730,	7391,	7561,	7728,	7995,	11243,	13663,	14462,	14276,	14821,	17396,	21281,	21303,	21701,	21502,	21543,	22298,	21654,	22121,	22029,	22984,	23486,	23719,	23971,	24368,	23523,	24949,	25293,	25692,	25931,	25432,	22020,	26244,	26344,	26132,	26119,	25205,	25560,	24345,	24871,	26370,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0] ;
var prod_hydro = [  20504,	21526,	21186,	22549,	22104,	24797,	27797,	29898,	29441,	27327,	31273,	27563,	25277,	28825,	28563,	33974,	26622,	36290,	32510,	32345,	33542,	36097,	37035,	36002,	30872,	32677,	33589,	35412,	36439,	30485,	30675,	33082,	33725,	36253,	39556,	35597,	29698,	34794,	34295,	40616,	37851,	42261,	36513,	36445,	35117,	32759,	32557,	36373,	37559,	37136,	37450,	33795,	39906,	39572,	39308,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0] ;
var prod_therm =        [0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0] ;
var prod_gaz_centr =    [0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0] ;
var prod_solar = [      0, 0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1.31,	2.197,	3.084,	3.971,	4.858,	5.745,	6.632,	7.519,	8.406,	9.293,	10.18,	12.038,	13.896,	15.754,	17.612,	19.47,	23.28,	27.09,	35.23,	52.88,	91.99,	166.26,	297.71,	498.76,	839.51,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0] ;
var prod_eol =  [       0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0.047,	0.3404,	0.6338,	0.9272,	1.2206,	1.514,	1.8074,	2.1008,	2.3942,	2.6876,	2.981,	4.0592,	5.1374,	6.2156,	7.2938,	8.372,	12.194,	16.016,	18.518,	22.623,	36.583,	70.134,	88.066,	89.518,	100.882,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0] ;
var conso = [           15891,	16741,	17716,	18483,	19346,	20221,	20708,	21527,	22437,	23699,	25087,	26248,	27141,	28774,	29567,	28903,	29903,	31289,	32464,	33766,	35252,	36194,	36731,	37970,	39665,	41321,	42348,	43591,	44327,	45502,	46578,	47586,	47866,	47239,	46897,	47882,	48692,	48612,	49620,	51213,	52373,	53749,	54029,	55122,	56171,	57330,	57782,	57432,	58729,	57494,	59785,	58599,	58973,	59323,	57466,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0] ;