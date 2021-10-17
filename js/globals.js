'use strict';

var dom;

// global snapshot
let jsFiles = [],
	gCount = 0,
	// alerts
	gCheck = [],
	gCheckOnce = [],
	// FP
	gData = [],
	gDetail = {},
	// prototype lies
	gLies = [],
	gLiesProxy = [],
	gLiesDetail = {},
	// errors
	gErrors = [],
	gErrorsOnce = [],
	// known
	gKnown = [],
	gKnownDetail = {},
	gKnownOnce = [],
	// bypasses
	gBypassed = [],
	gBypassedOnce = [],
	// methods
	gMethods = [],
	gMethodsDetail = {},
	gMethodsOnce = [],
	// perf
	gPerf = [],
	gPerfDetail = []

// section snapshot
let sData = {},
	sDetail = {},
	sPerfDetail = []
// fluid
let protoLies = [],
	proxyLies = [],
	navKeys = {}

// android
let avh = "",
	firstH = window.innerHeight,
	firstW = window.innerWidth,
// css
	s0 = " <span class='",
	smono = s0+"mono'>",
	sb = s0+"bad'>",
	sg = s0+"good'>",
	sf = s0+"faint'>",
	sn = s0+"neutral'>",
	snc = s0+"no_color'>",
	so = s0+"orange'>",
	s1 = s0+"s1'>",
	s2 = s0+"s2'>",
	s3 = s0+"s3'>",
	s4 = s0+"s4'>",
	s5 = s0+"s5'>",
	s6 = s0+"s6'>",
	s7 = s0+"s7'>",
	s8 = s0+"s8'>",
	s9 = s0+"s9'>",
	s10 = s0+"s10'>",
	s11 = s0+"s11'>",
	s12 = s0+"s12'>",
	s13 = s0+"s13'>",
	s14 = s0+"s14'>",
	s15 = s0+"s15'>",
	s16 = s0+"s16'>",
	s17 = s0+"s17'>",
	s18 = s0+"s18'>",
	sc = "</span>",
	soL = "<code class='lies'>",
	soB = "<code class='bypass'>",
	scC = "</code>",
// show/hide colors
	zhide = "#161b22",
	zshow = "#b3b3b3",
// common results
	zB0 = "blocked",
	zD = "disabled",
	zE = "enabled",
	zErr = "error",
	zNS = "not supported",
	zNA = "n/a",
	zS = "success",
	zF = "failed",
	zU = "undefined",
	zFF = "Firefox",
	zTB = "Tor Browser",
	zMingw64 = "Firefox [64bit]"+ s3+"[mingw]"+sc,
	zMingw32 = "Firefox [32bit]"+ s3+"[mingw]"+sc,
	zMingw = "Firefox"+ s3+"[mingw]"+sc,
	zSDK64 = "Firefox [64bit]"+ s3+"[winsdk]"+sc,
	zSDK32 = "Firefox [32bit]"+ s3+"[winsdk]"+sc,
	zSDK = "Firefox"+ s3+"[winsdk]"+sc,
	zSIM = " [sim]",
	zNEW = sb+"[NEW]"+sc,
	zLIE = "untrustworthy",
// notes
	tb_green = sg+"[TB]"+sc,
	tb_red = sb+"[TB]"+sc,
	tb_standard = sg+"[TB Standard]"+sc,
	tb_safer = sg+"[TB Safer]"+sc,
	rfp_green = sg+"[RFP]"+sc,
	rfp_red = sb+"[RFP]"+sc,
	rfp_random_green = sg+"[RFP random]"+sc,
	rfp_random_red = sb+"[RFP random]"+sc,
	lb_green = sg+"[LB]"+sc,
	lb_red = sb+"[LB]"+sc,
	nw_green = sg+"[RFP New Window]"+sc,
	nw_red = sb+"[RFP New Window]"+sc,
	enUS_green = sg+"[en-US]</span> ",
	enUS_red = sb+"[en-US]</span> ",
	spoof_both_green = sg+"[en-US + RFP]"+sc,
	spoof_both_red = sb+"[en-US +/or RFP]"+sc,
	default_tb_green = sg+"[TB default]"+sc,
	default_tb_red = sb+"[TB default]"+sc,
	default_ff_green = sg+"[FF default]"+sc,
	default_ff_red = sb+"[FF default]"+sc,
	note_random = "[random]"+sc,
	note_noise = "[noise detected]"+sc,
	match_green = sg+"[match]"+sc,
	match_red = sb+"[match]"+sc,
	note_file = "",
	note_ttc = sf+"test to come"+sc,
// other
	isBaseFonts = false,
	isBrave = false,
	isBraveMode = "unknown",
	isChannel = "",
	isChrome = "", // chrome://
	isEngine = "",
	isFF = false,
	isFFno = [],
	isFFyes = [],
	isFile = false,
	isLoad = true,
	isOS = "",
	isOS64 = "unknown",
	isPerf = true,
	canPerf = true,
	isResource = "",
	isResourceMetric = "",
	isRFP = false,
	isSecure = false,
	isTB = false,
	isVer = "",
	isVerPlus = false,
// dev
	gt0,
	gLoad = true,
	gRun = true,
	gClick = true,
	logExtra = false,
	logResize = true,
	logStorage = false,
// simulations
	runS = false, // different values
	runSUA = false, // ua lies
	runSL = false, // lies
	runSC = false, // css styles
	runSP = false // block performance.now()
