/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AxisOrientation } from '@chart-parts/interfaces'
import {
	Axis,
	Chart,
	Line,
	LinearScale,
	LogScale,
	Dimension,
} from '@chart-parts/react'
import React, { memo } from 'react'

// #region data
const data = [
	{ e: 52717102423188.01, oe: 110486798937.48236 },
	{ e: 189702942408.39783, oe: 186986042918.83188 },
	{ e: 188792466396.98846, oe: 186572773589.83194 },
	{ e: 186950716210.90176, oe: 184505972936.45746 },
	{ e: 185976906406.1499, oe: 184096667603.3416 },
	{ e: 184557137812.2744, oe: 182434596593.5245 },
	{ e: 184680417124.03375, oe: 182517902544.5916 },
	{ e: 184982974369.2217, oe: 183078081101.63306 },
	{ e: 184365125693.02658, oe: 182191001346.92596 },
	{ e: 184646354817.53625, oe: 182570696775.74878 },
	{ e: 184750558013.3135, oe: 182588003584.4049 },
	{ e: 184572684650.06778, oe: 182320809410.65536 },
	{ e: 184046566570.66315, oe: 181813834718.58612 },
	{ e: 184058995112.75452, oe: 181881887266.07004 },
	{ e: 184238206898.71075, oe: 182020636189.61874 },
	{ e: 183653820364.2639, oe: 181504396008.85098 },
	{ e: 183991283631.44763, oe: 181814600873.42615 },
	{ e: 184091026162.82156, oe: 182028913441.8845 },
	{ e: 183654846750.45654, oe: 181368779691.55078 },
	{ e: 183523597615.57748, oe: 181261718745.19543 },
	{ e: 183277029833.90054, oe: 180903083489.75052 },
	{ e: 182295934057.39175, oe: 179884765254.86603 },
	{ e: 180553879345.21277, oe: 178272200728.7073 },
	{ e: 178674135564.11447, oe: 176558295868.06863 },
	{ e: 176939616022.05328, oe: 174595217194.16364 },
	{ e: 176405636432.4905, oe: 174443451635.50964 },
	{ e: 175711485999.27914, oe: 173726946857.96823 },
	{ e: 175138822606.3419, oe: 173122061931.8656 },
	{ e: 174196780991.26535, oe: 172277993604.18854 },
	{ e: 172944150539.71204, oe: 170912986650.0169 },
	{ e: 171828274670.68726, oe: 169816984478.8991 },
	{ e: 171501980690.66177, oe: 169515766768.58112 },
	{ e: 170427754441.6021, oe: 168318672983.36548 },
	{ e: 170064275197.24088, oe: 168162448181.71188 },
	{ e: 170189084962.99142, oe: 168377948440.1832 },
	{ e: 169305696998.57996, oe: 167539138502.00906 },
	{ e: 169290875678.96414, oe: 167420155774.92993 },
	{ e: 169162414203.83405, oe: 167080863875.1053 },
	{ e: 168621203074.6901, oe: 166925383333.13278 },
	{ e: 167454707018.23404, oe: 165422233385.50107 },
	{ e: 167253023013.14035, oe: 165501519670.35916 },
	{ e: 167480655864.6017, oe: 165721685689.15945 },
	{ e: 167282311614.02164, oe: 165575938016.9372 },
	{ e: 166949677259.93118, oe: 165082713086.13187 },
	{ e: 166151671185.77548, oe: 164261454577.07996 },
	{ e: 165713979220.6526, oe: 164064970426.38904 },
	{ e: 166298404738.37796, oe: 164554875733.80743 },
	{ e: 165294925831.50394, oe: 163542795945.04922 },
	{ e: 166050967719.043, oe: 164442533816.88748 },
	{ e: 166186600244.87692, oe: 164464212110.76297 },
	{ e: 166563159917.32108, oe: 164751062733.5139 },
	{ e: 166433540823.12097, oe: 164757133033.02155 },
	{ e: 166091408400.41632, oe: 164320414493.97128 },
	{ e: 165221540062.7533, oe: 163207172476.0092 },
	{ e: 164681255680.92996, oe: 162973175021.99652 },
	{ e: 164442654216.06436, oe: 162686238293.09177 },
	{ e: 164255218601.85678, oe: 162606301925.6851 },
	{ e: 164550441616.04614, oe: 162864957314.07547 },
	{ e: 164211533413.21463, oe: 162398437462.50748 },
	{ e: 164201881158.91833, oe: 162508265421.7313 },
	{ e: 164283585147.9761, oe: 162430346354.8668 },
	{ e: 164180130316.08496, oe: 162250562760.107 },
	{ e: 164512163166.4981, oe: 162756150596.77554 },
	{ e: 164931228274.7487, oe: 163080989324.71896 },
	{ e: 165565229209.50528, oe: 163763428585.36618 },
	{ e: 166004778225.3968, oe: 164116943497.27625 },
	{ e: 165558645416.89087, oe: 163638597614.68192 },
	{ e: 165397801503.04358, oe: 163504980635.2136 },
	{ e: 165945186684.62427, oe: 164005519998.33917 },
	{ e: 164672773443.62073, oe: 162827117886.99277 },
	{ e: 164245995620.2332, oe: 162305018842.75494 },
	{ e: 164919509046.92953, oe: 163163414068.65417 },
	{ e: 165019971168.693, oe: 163394016047.45422 },
	{ e: 165869558342.2282, oe: 164086753120.73212 },
	{ e: 165737985107.5724, oe: 163821278543.14746 },
	{ e: 165781883575.56897, oe: 163834569431.23813 },
	{ e: 165550537942.39236, oe: 163660530881.37262 },
	{ e: 164763974777.76886, oe: 162760139359.20602 },
	{ e: 164761415382.28366, oe: 162803644022.2398 },
	{ e: 164611089185.7002, oe: 162554255503.84024 },
	{ e: 164108710255.0039, oe: 162186589041.91165 },
	{ e: 163990479058.0738, oe: 161924668273.8394 },
	{ e: 164353838162.0931, oe: 162454426312.27213 },
	{ e: 164252497228.78018, oe: 162282509325.9438 },
	{ e: 164618112388.64896, oe: 162929443571.53122 },
	{ e: 164592438195.72244, oe: 162681926168.63672 },
	{ e: 164168031405.30954, oe: 162121893377.36475 },
	{ e: 163436852380.96014, oe: 161501985968.3783 },
	{ e: 163452428589.7386, oe: 161670004461.50488 },
	{ e: 163260171901.54468, oe: 161281974502.38986 },
	{ e: 163582787863.25095, oe: 161854099596.80865 },
	{ e: 163408184066.04187, oe: 161405704029.8299 },
	{ e: 162846664601.66962, oe: 160997294704.32452 },
	{ e: 164070295860.90582, oe: 162293015486.04218 },
	{ e: 164425824765.27722, oe: 162310732018.5561 },
	{ e: 164056867163.34836, oe: 162235961091.14804 },
	{ e: 164006200216.9146, oe: 162104643290.54736 },
	{ e: 163719070197.8014, oe: 161751996049.07367 },
	{ e: 163644890670.72818, oe: 161763476007.06296 },
	{ e: 163757881702.94138, oe: 161743335894.246 },
	{ e: 163883782273.4386, oe: 162059922017.91214 },
	{ e: 164151363382.24585, oe: 162325731829.3982 },
	{ e: 164973353941.12646, oe: 162971278758.53082 },
	{ e: 164427764716.0292, oe: 162323192768.59787 },
	{ e: 163789557087.23196, oe: 162008723458.1363 },
	{ e: 163888900248.92188, oe: 161824041351.4416 },
	{ e: 164293545659.45053, oe: 162533860512.50455 },
	{ e: 164614838302.93503, oe: 162897783190.9706 },
	{ e: 164631506276.88736, oe: 162815402992.9785 },
	{ e: 164888649418.57617, oe: 163102924654.6603 },
	{ e: 164366184372.66232, oe: 162569154700.78986 },
	{ e: 164447172451.98456, oe: 162575737298.39987 },
	{ e: 164569348276.64938, oe: 162729640805.02484 },
	{ e: 164737771761.7843, oe: 162544287677.02686 },
	{ e: 164060146973.58118, oe: 162075815226.13132 },
	{ e: 163639042858.63937, oe: 161789052007.9131 },
	{ e: 163713249857.74973, oe: 161966612893.54932 },
	{ e: 164449089607.42188, oe: 162692507056.47006 },
	{ e: 165492153033.49017, oe: 163514733453.55716 },
	{ e: 164856483435.40372, oe: 162910047082.2313 },
	{ e: 165667183384.14282, oe: 163682155095.7995 },
	{ e: 165060763558.34784, oe: 162984561268.5032 },
	{ e: 164659114256.8439, oe: 162671511923.30533 },
	{ e: 164087107740.25162, oe: 162131468973.0396 },
	{ e: 163720959203.5986, oe: 161688904264.04303 },
	{ e: 164783257767.57822, oe: 162796645738.1181 },
	{ e: 164126199914.01993, oe: 162256556856.8332 },
	{ e: 163587468905.79224, oe: 161760011407.8811 },
	{ e: 164159092413.72574, oe: 162065454598.2237 },
	{ e: 163832707796.79367, oe: 161862235954.33606 },
	{ e: 163821601296.98987, oe: 161861374079.78482 },
	{ e: 163302391224.4045, oe: 161323763343.52042 },
	{ e: 163477479869.4838, oe: 161482055506.3741 },
	{ e: 164354216721.4095, oe: 162458958966.27518 },
	{ e: 164090942033.12775, oe: 162124269523.96777 },
	{ e: 163697835141.47668, oe: 161829582161.71912 },
	{ e: 164407143931.7687, oe: 162495958317.74448 },
	{ e: 164002941168.66708, oe: 161990404505.29178 },
	{ e: 163767642673.09424, oe: 162057876022.41254 },
	{ e: 163852377509.01053, oe: 162060583571.71957 },
	{ e: 163966057078.037, oe: 162087316492.61636 },
	{ e: 164732118330.52072, oe: 162856278975.2408 },
	{ e: 164319994881.889, oe: 162320205431.60214 },
	{ e: 164350826317.69107, oe: 162434814864.60358 },
	{ e: 164725002726.51654, oe: 162941194476.50665 },
	{ e: 165356436633.47983, oe: 163531978898.56982 },
	{ e: 166401514689.81677, oe: 164259408097.6879 },
	{ e: 165144806752.11258, oe: 163336746089.0822 },
	{ e: 165318303868.39288, oe: 163330344610.72983 },
	{ e: 165805016173.35046, oe: 163918683787.6841 },
	{ e: 166457217681.04785, oe: 164463953535.02823 },
	{ e: 165958296329.80475, oe: 163810099015.11798 },
	{ e: 164668825412.1255, oe: 162662771931.20212 },
	{ e: 165407804545.98364, oe: 163757690029.89853 },
	{ e: 165435312069.42758, oe: 163333379978.7045 },
	{ e: 164810061056.96777, oe: 162807880689.75607 },
	{ e: 164590467524.48306, oe: 162695419110.3079 },
	{ e: 165311335223.6148, oe: 163470178348.9864 },
	{ e: 164392234388.24493, oe: 162402760778.65033 },
	{ e: 164465452119.0142, oe: 162734440304.5257 },
	{ e: 165236669798.3434, oe: 163229533001.7012 },
	{ e: 164149000908.6872, oe: 162171444472.61356 },
	{ e: 164326828760.2593, oe: 162227362150.61557 },
	{ e: 164440291035.03488, oe: 162572780767.01517 },
	{ e: 165372464168.42563, oe: 163417198378.57208 },
	{ e: 166843747152.2478, oe: 164823429407.1043 },
	{ e: 165862017712.45142, oe: 163911544971.90454 },
	{ e: 165920891518.40543, oe: 163797586470.71906 },
	{ e: 165153901651.62573, oe: 163053850457.67764 },
	{ e: 164139343145.46292, oe: 162222181795.15756 },
	{ e: 164005545470.04205, oe: 162002557741.82645 },
	{ e: 163709877868.4402, oe: 161786790178.17188 },
	{ e: 164450910795.5194, oe: 162438168005.05685 },
	{ e: 164277993881.9298, oe: 162408342683.139 },
	{ e: 165832078507.15305, oe: 163885345321.06256 },
	{ e: 166191225830.62573, oe: 164096345625.98254 },
	{ e: 164520243592.0924, oe: 162477493390.29184 },
	{ e: 164509439395.59323, oe: 162528880142.40317 },
	{ e: 165641478009.5118, oe: 163613827282.94275 },
	{ e: 166733142855.70224, oe: 164820963730.50247 },
	{ e: 165677140587.6278, oe: 163595695665.128 },
	{ e: 165763986664.4199, oe: 163890597511.50818 },
	{ e: 166040956714.0627, oe: 163863199565.4031 },
	{ e: 165539847645.21686, oe: 163475461646.8214 },
	{ e: 165881897806.89163, oe: 164014447888.16263 },
	{ e: 166193906249.2153, oe: 164216924906.8765 },
	{ e: 164956660804.31183, oe: 162956091207.0008 },
	{ e: 164198608115.91016, oe: 162222055359.17294 },
	{ e: 164579666292.3245, oe: 162631740611.45026 },
	{ e: 163933934732.79013, oe: 162052471471.5441 },
	{ e: 164088077089.503, oe: 162293884339.8342 },
	{ e: 164079864894.0679, oe: 162184813849.33774 },
	{ e: 165618619304.61865, oe: 163885891411.9361 },
	{ e: 164943343076.725, oe: 162974831313.50812 },
	{ e: 165061953807.9135, oe: 163138498223.44287 },
	{ e: 165052073388.9557, oe: 163214966295.64618 },
	{ e: 166222789228.04645, oe: 164200476081.79855 },
	{ e: 166409404534.28036, oe: 164353334944.7702 },
	{ e: 165791524335.94852, oe: 163741739068.13504 },
	{ e: 166003570078.36868, oe: 164036345837.16595 },
	{ e: 165078579329.79382, oe: 163860128730.7786 },
	{ e: 152730774884.23233, oe: 143691780356.95053 },
	{ e: 144013306714.6832, oe: 137688156249.02502 },
	{ e: 140150984463.67252, oe: 134614646884.833 },
	{ e: 136988354988.70886, oe: 131491851134.4952 },
	{ e: 134642046768.31693, oe: 128931670921.46248 },
	{ e: 131946973443.16562, oe: 125859388194.5684 },
	{ e: 129453435707.67346, oe: 123512555619.54024 },
	{ e: 126663038338.72191, oe: 120693228435.48679 },
	{ e: 123016452876.38393, oe: 116873696854.9405 },
	{ e: 119971942603.45065, oe: 114278973398.4202 },
	{ e: 117308024255.38882, oe: 111719782945.6923 },
	{ e: 115755907654.85037, oe: 110035946674.5283 },
	{ e: 113867992071.20311, oe: 108529965667.34784 },
	{ e: 113221613395.01762, oe: 107951836837.2784 },
	{ e: 111831308956.38004, oe: 106475707417.26422 },
	{ e: 111177978502.51614, oe: 106013222571.05353 },
	{ e: 110440277972.51266, oe: 105099104732.41096 },
	{ e: 109194411916.3368, oe: 103774491433.49532 },
	{ e: 108460212517.8085, oe: 103430629794.3328 },
	{ e: 107633817165.28426, oe: 102229795320.60039 },
	{ e: 106331301768.77356, oe: 100760198255.68488 },
	{ e: 105938018582.26796, oe: 100701187787.77652 },
	{ e: 104838269566.77678, oe: 99393978194.40057 },
	{ e: 104004699390.19826, oe: 98460022999.2794 },
	{ e: 102506002675.51001, oe: 96616968429.22374 },
	{ e: 101784554250.54639, oe: 96313097776.61229 },
	{ e: 100739406923.73167, oe: 95085472783.26222 },
	{ e: 99978125801.60481, oe: 94584144505.50563 },
	{ e: 98713638795.65106, oe: 92688572591.91963 },
	{ e: 97606824060.92076, oe: 92195574311.74977 },
	{ e: 96599826188.76135, oe: 90870395021.40417 },
	{ e: 95337799198.84839, oe: 89558729990.73454 },
	{ e: 94883015184.73402, oe: 89236129027.11533 },
	{ e: 93547669124.39342, oe: 87621161655.6096 },
	{ e: 92447311577.87401, oe: 86759149705.3844 },
	{ e: 91679589296.50444, oe: 85822370485.20644 },
	{ e: 90190155869.84425, oe: 84454500240.03174 },
	{ e: 89628241926.98592, oe: 83962105108.96361 },
	{ e: 88753877389.32494, oe: 82887547617.52122 },
	{ e: 87412259755.36417, oe: 81442056510.91956 },
	{ e: 86275785711.27766, oe: 80183301218.91965 },
	{ e: 84957728621.96353, oe: 79006510841.3754 },
	{ e: 83801254242.14235, oe: 77910348137.80583 },
	{ e: 82968215767.47585, oe: 76905118990.51047 },
	{ e: 82128659254.67401, oe: 75945946945.30714 },
	{ e: 80959796658.87956, oe: 74839838105.19833 },
	{ e: 80078178397.63132, oe: 74010357089.85414 },
	{ e: 79301373264.90355, oe: 73329229274.8113 },
	{ e: 78365489976.51202, oe: 72352828641.03033 },
	{ e: 77343435015.47911, oe: 71010208078.69513 },
	{ e: 76612065154.39093, oe: 70450889291.77954 },
	{ e: 75684086047.29286, oe: 69541549792.05342 },
	{ e: 74878137936.18823, oe: 68997097361.75429 },
	{ e: 73717481559.35637, oe: 67382968034.812355 },
	{ e: 72571956740.06145, oe: 66181162385.06179 },
	{ e: 71510606703.72453, oe: 65338192155.15134 },
	{ e: 70839174464.84346, oe: 64644290975.780785 },
	{ e: 70438030794.97086, oe: 64409905101.88392 },
	{ e: 69716319397.73396, oe: 63548641054.495186 },
	{ e: 68384156108.57867, oe: 62040493557.4104 },
	{ e: 67346311756.917015, oe: 60952405612.92829 },
	{ e: 66240803611.67814, oe: 59802299533.590546 },
	{ e: 65581106825.76502, oe: 59318679735.79299 },
	{ e: 64443453991.27314, oe: 58175408231.786896 },
	{ e: 63610470626.19552, oe: 57206322902.507645 },
	{ e: 62934068859.34461, oe: 56711570154.430016 },
	{ e: 61913739049.20368, oe: 55463511933.101204 },
	{ e: 60838578528.27542, oe: 54489469996.26291 },
	{ e: 59676582529.494064, oe: 53337821828.65529 },
	{ e: 59055954709.210205, oe: 52874602537.29689 },
	{ e: 58172578266.790924, oe: 51979579626.65431 },
	{ e: 57533005368.913345, oe: 51397968693.25405 },
	{ e: 56653386847.29677, oe: 50433270224.06209 },
	{ e: 55753460299.47076, oe: 49566007523.33028 },
	{ e: 54998634789.34465, oe: 48935082296.205826 },
	{ e: 54207779511.14695, oe: 48073535645.580376 },
	{ e: 53166969017.22024, oe: 46881174239.02432 },
	{ e: 52384329753.79047, oe: 46139807069.43921 },
	{ e: 51460733672.59595, oe: 45144348782.78454 },
	{ e: 50399958180.861946, oe: 44096962575.8525 },
	{ e: 49516739364.453835, oe: 43289983690.467354 },
	{ e: 48530688208.03153, oe: 42332839697.413246 },
	{ e: 47827059237.40993, oe: 41623178715.79485 },
	{ e: 46826187607.8424, oe: 40760894972.925285 },
	{ e: 45961664490.93103, oe: 39888996338.284225 },
	{ e: 45253501219.535934, oe: 39276253318.19575 },
	{ e: 44583364457.23999, oe: 38650469585.8597 },
	{ e: 43756641958.33087, oe: 37693682204.25223 },
	{ e: 43044695060.08702, oe: 37228087031.82537 },
	{ e: 42446999015.32999, oe: 36566067509.24755 },
	{ e: 41763329456.49445, oe: 35882424956.178795 },
	{ e: 41012555403.46688, oe: 35158344515.49796 },
	{ e: 40306118772.36631, oe: 34533958386.46058 },
	{ e: 39511900519.97075, oe: 33840178172.209663 },
	{ e: 38739910332.30557, oe: 32961331993.530815 },
	{ e: 37915401881.766304, oe: 32250135272.70812 },
	{ e: 37298366149.73716, oe: 31721458033.93216 },
	{ e: 36617839072.651146, oe: 31198435884.348507 },
	{ e: 36110906539.7533, oe: 30725550707.876842 },
	{ e: 35282598205.41333, oe: 29794739506.388237 },
	{ e: 34473033905.610596, oe: 29159090127.433594 },
	{ e: 33739614910.245525, oe: 28393406674.785976 },
	{ e: 32978539016.424877, oe: 27629125226.135506 },
	{ e: 32319128564.25324, oe: 27141901875.632206 },
	{ e: 31692483823.076523, oe: 26549481977.31535 },
	{ e: 31092606977.987686, oe: 26132495354.00058 },
	{ e: 30483971912.719467, oe: 25548537305.16743 },
	{ e: 29803543390.089878, oe: 24823023325.54013 },
	{ e: 29194947449.324036, oe: 24241264703.8584 },
	{ e: 28638627039.652073, oe: 23820085524.36503 },
	{ e: 27987956517.30727, oe: 23242273421.603527 },
	{ e: 27392718156.41841, oe: 22640580789.09846 },
	{ e: 26689612618.250385, oe: 22049529356.970493 },
	{ e: 26136927618.201, oe: 21567753270.195404 },
	{ e: 25497218586.339973, oe: 20958441224.49704 },
	{ e: 24885051435.55465, oe: 20403915662.50624 },
	{ e: 24306741044.39607, oe: 19955784273.212814 },
	{ e: 23763795690.296528, oe: 19463556995.154205 },
	{ e: 23260920666.326378, oe: 19063960238.646435 },
	{ e: 22721014239.91599, oe: 18542305739.66541 },
	{ e: 22138313798.541405, oe: 18028854053.86791 },
	{ e: 21616591509.964565, oe: 17621747425.507477 },
	{ e: 21100399269.061634, oe: 17168974047.16698 },
	{ e: 20635622242.0761, oe: 16723958358.90484 },
	{ e: 20147493165.348236, oe: 16379907931.196808 },
	{ e: 19689246217.98056, oe: 16001436594.967842 },
	{ e: 19212937771.72651, oe: 15619777857.88344 },
	{ e: 18693872635.801678, oe: 15108150364.231527 },
	{ e: 18152577050.117794, oe: 14608016598.127699 },
	{ e: 17640672697.13796, oe: 14176725402.21591 },
	{ e: 17142888155.819223, oe: 13729925665.999035 },
	{ e: 16699129880.014751, oe: 13373376387.957745 },
	{ e: 16253384964.54647, oe: 13015976937.22495 },
	{ e: 15818289065.555681, oe: 12643242231.746346 },
	{ e: 15294190491.887373, oe: 12178366720.599716 },
	{ e: 14827225429.369576, oe: 11778316100.023005 },
	{ e: 14369008572.67154, oe: 11379226776.089209 },
	{ e: 13938172980.504812, oe: 11050015264.522476 },
	{ e: 13519782124.497189, oe: 10710727947.395506 },
	{ e: 13111419863.876986, oe: 10361962403.089073 },
	{ e: 12682969046.71859, oe: 9986348876.337349 },
	{ e: 12221809693.1063, oe: 9593868234.996653 },
	{ e: 11844584286.857378, oe: 9304514894.28241 },
	{ e: 11467865340.72558, oe: 9015696851.44214 },
	{ e: 11084009095.987453, oe: 8694543822.815042 },
	{ e: 10711573245.39102, oe: 8399849477.787385 },
	{ e: 10349659621.031902, oe: 8079420550.341117 },
	{ e: 9959634932.20138, oe: 7763193383.722185 },
	{ e: 9595749601.828085, oe: 7469142375.593855 },
	{ e: 9274447190.320766, oe: 7229114235.360608 },
	{ e: 8902686230.54693, oe: 6933814645.418837 },
	{ e: 8577612256.0993, oe: 6677377986.139697 },
	{ e: 8249906293.916564, oe: 6400338215.410472 },
	{ e: 7904870391.363323, oe: 6142158949.617133 },
	{ e: 7587384100.193141, oe: 5892428091.671447 },
	{ e: 7272027125.791824, oe: 5628869476.292469 },
	{ e: 6956630952.943398, oe: 5391112574.865064 },
	{ e: 6665937861.113433, oe: 5165627014.287281 },
	{ e: 6374026042.594861, oe: 4940537554.096448 },
	{ e: 6105858405.216133, oe: 4740622325.050149 },
	{ e: 5807705986.805555, oe: 4497998506.991562 },
	{ e: 5536206616.342242, oe: 4286819435.412225 },
	{ e: 5259821309.548491, oe: 4077281193.444242 },
	{ e: 5003144100.656559, oe: 3870792446.96605 },
	{ e: 4744843617.807755, oe: 3665107422.448144 },
	{ e: 4497430217.329331, oe: 3476602594.650821 },
	{ e: 4259685523.4208, oe: 3302671267.5385823 },
	{ e: 4021026244.3985786, oe: 3114428729.529595 },
	{ e: 3814911077.018777, oe: 2971685383.422743 },
	{ e: 3589087267.9023147, oe: 2795240744.6759996 },
	{ e: 3360180837.160587, oe: 2616498829.2205234 },
	{ e: 3156187738.5198765, oe: 2467579181.4577746 },
	{ e: 2956368038.503482, oe: 2318930344.793811 },
	{ e: 2768507051.489765, oe: 2178018414.2299175 },
	{ e: 2589223243.3417096, oe: 2047877335.1737325 },
	{ e: 2416689700.9890256, oe: 1923056035.00227 },
	{ e: 2246657843.2509437, oe: 1794846338.1937807 },
	{ e: 2085074424.1109374, oe: 1677930087.0603414 },
	{ e: 1931179684.8371458, oe: 1568412870.6059375 },
	{ e: 1785256536.3778036, oe: 1461257239.5064259 },
	{ e: 1711804250.9267042, oe: 1352885552.8627515 },
	{ e: 1650232101.8369193, oe: 1274010562.334197 },
	{ e: 1598417301.6033328, oe: 1207569336.4298902 },
	{ e: 1562770725.281916, oe: 1164377258.9116213 },
	{ e: 1530253495.2387214, oe: 1126692647.7724192 },
	{ e: 1502666031.0139897, oe: 1095544284.07749 },
	{ e: 1478612351.4181852, oe: 1064645654.923354 },
	{ e: 1459813553.1519337, oe: 1041711658.8085085 },
	{ e: 1446717318.6595263, oe: 1025643620.5225574 },
	{ e: 1432008420.6895308, oe: 1007470586.8511984 },
	{ e: 1420957818.0104496, oe: 994848167.4260614 },
	{ e: 1412754591.1978412, oe: 984682386.4556519 },
	{ e: 1406584665.398104, oe: 977511852.5466949 },
	{ e: 1399580514.3369017, oe: 968010690.8018823 },
	{ e: 1392507705.1912882, oe: 958739373.6066641 },
	{ e: 1388431563.5037034, oe: 953773506.8005993 },
	{ e: 1385946413.3586123, oe: 949987262.8903365 },
	{ e: 1383233454.5325398, oe: 947250134.0937984 },
	{ e: 1380661691.4688797, oe: 942924162.9013067 },
	{ e: 913027628.1547588, oe: 938852239.848679 },
	{ e: 808941600.2831181, oe: 839678624.9632119 },
	{ e: 722620114.6406696, oe: 757643483.2709799 },
	{ e: 653921891.824894, oe: 692702709.3241763 },
	{ e: 594024249.6230519, oe: 636305317.3199813 },
	{ e: 543619323.9034088, oe: 589009081.090843 },
	{ e: 498795476.9761829, oe: 546779640.218257 },
	{ e: 457069549.8104452, oe: 507885068.8365689 },
	{ e: 423189100.0373693, oe: 476197870.2730662 },
	{ e: 392508864.6842751, oe: 448087956.4055058 },
	{ e: 364602515.65525514, oe: 422111823.9008299 },
	{ e: 340699701.031197, oe: 399975477.4076558 },
	{ e: 318448687.171854, oe: 379572348.7981905 },
	{ e: 299748380.4486367, oe: 362481759.7708221 },
	{ e: 282256781.8115525, oe: 346501398.16366965 },
	{ e: 266433671.5803545, oe: 332044454.8932278 },
	{ e: 251101691.8260301, oe: 318084234.07145715 },
	{ e: 237501999.92257458, oe: 305908853.03913695 },
	{ e: 225469879.2711028, oe: 294988416.9982465 },
	{ e: 213787151.76601192, oe: 284937319.79516065 },
	{ e: 203728580.97404343, oe: 275948890.52550143 },
	{ e: 193567480.47302404, oe: 267220890.87294045 },
	{ e: 184357904.97656068, oe: 259300616.0887982 },
	{ e: 176720723.65927285, oe: 252929074.55129102 },
	{ e: 168940491.07630634, oe: 246504692.14060017 },
	{ e: 161652677.8971877, oe: 240847614.99151987 },
	{ e: 154866990.38610873, oe: 235264170.10808155 },
	{ e: 148614783.05267665, oe: 230124983.0042417 },
	{ e: 142858095.650972, oe: 225419328.3592038 },
	{ e: 137126016.86472878, oe: 221238643.2396348 },
	{ e: 131880199.70056549, oe: 217401220.32897505 },
	{ e: 126845453.69543849, oe: 213816519.17109478 },
	{ e: 122224046.91256568, oe: 210505542.68451568 },
	{ e: 118016377.44071004, oe: 207356179.32502258 },
	{ e: 114167871.83760601, oe: 205047025.3912759 },
	{ e: 109669599.07106654, oe: 201903105.181968 },
	{ e: 105850854.22155216, oe: 199442049.8592821 },
	{ e: 102645360.44861552, oe: 197506553.2869127 },
	{ e: 99330460.09588319, oe: 195459747.19552258 },
	{ e: 96706925.39149995, oe: 193984725.02138576 },
	{ e: 93810799.93597971, oe: 192347487.12772515 },
	{ e: 90824901.29963325, oe: 190646075.18889257 },
	{ e: 88249200.23564476, oe: 189251463.9830279 },
	{ e: 85975717.81164426, oe: 188415617.531438 },
	{ e: 83484451.82564744, oe: 187431880.13607395 },
	{ e: 81373508.50443232, oe: 186607048.61633804 },
	{ e: 79392222.37184212, oe: 185931340.78165993 },
	{ e: 77126641.92760263, oe: 185226813.3725821 },
	{ e: 75110787.25548375, oe: 184793500.5713453 },
	{ e: 73063815.25136444, oe: 184171990.04744363 },
	{ e: 71291332.80569582, oe: 184048524.91282648 },
	{ e: 69492603.1665978, oe: 183758243.11002183 },
	{ e: 67990763.07766813, oe: 183528216.48327234 },
	{ e: 66475112.304577276, oe: 183241187.1336707 },
	{ e: 65053348.56524062, oe: 183278796.74284765 },
	{ e: 63705266.21125554, oe: 183499825.84971756 },
	{ e: 62128362.43878769, oe: 183522975.49463865 },
	{ e: 60907399.41572592, oe: 183805799.68268174 },
	{ e: 59689981.65275538, oe: 184033165.12264207 },
	{ e: 58514295.25501169, oe: 184140812.5343527 },
	{ e: 57349162.49404701, oe: 184556354.93295375 },
	{ e: 56359193.111766875, oe: 185035489.17188916 },
	{ e: 55236585.061295845, oe: 185750655.8802639 },
	{ e: 54136650.90797275, oe: 186250772.29377547 },
	{ e: 53060333.1974094, oe: 186708238.61897802 },
	{ e: 52158235.347904615, oe: 187358136.18031433 },
	{ e: 51315013.04161295, oe: 188156753.73536298 },
	{ e: 50537244.56140295, oe: 188857930.41571358 },
	{ e: 49548874.27598535, oe: 189638867.6706106 },
	{ e: 48820442.47923383, oe: 190614672.2479464 },
	{ e: 47933623.23748207, oe: 191296468.651609 },
	{ e: 47129333.17452016, oe: 192114162.4739709 },
	{ e: 46435006.34107353, oe: 193161992.97146893 },
	{ e: 45761201.19444832, oe: 193694426.15686867 },
	{ e: 45101184.76921593, oe: 194364858.2063311 },
	{ e: 44516181.315919325, oe: 195308058.76976696 },
	{ e: 43879888.512420215, oe: 196193955.28931716 },
	{ e: 43287336.70738766, oe: 196860966.6399196 },
	{ e: 42793675.38525105, oe: 197662105.37699595 },
	{ e: 42314792.436804615, oe: 198394098.52281192 },
	{ e: 41824880.99125874, oe: 199272819.35234776 },
	{ e: 41297291.63447463, oe: 200151674.01196504 },
	{ e: 40781389.492809795, oe: 201223223.40166458 },
	{ e: 40364630.63593321, oe: 202253161.83763477 },
	{ e: 39906366.15989898, oe: 203191791.79106542 },
	{ e: 39483902.20502097, oe: 204398820.85939267 },
	{ e: 39066090.267224774, oe: 205302339.3200804 },
	{ e: 38643897.09574081, oe: 206269770.01261604 },
	{ e: 38251073.438957624, oe: 207135896.91274804 },
	{ e: 37880763.05177744, oe: 208219115.14093682 },
	{ e: 37523153.38790259, oe: 209265591.3228396 },
	{ e: 37198278.87069999, oe: 210088092.6615012 },
	{ e: 36907370.54088371, oe: 211207378.83221713 },
	{ e: 36590280.28100782, oe: 212358925.70003924 },
	{ e: 36211823.22438835, oe: 213128274.5754461 },
	{ e: 35929735.92660569, oe: 214051712.12729186 },
	{ e: 35658579.36112014, oe: 214975975.08288923 },
	{ e: 35428574.45709143, oe: 215816312.5720127 },
	{ e: 35176833.39967719, oe: 216813316.7181654 },
	{ e: 34872156.76759206, oe: 217864988.56825086 },
	{ e: 34645619.094932124, oe: 218592008.01751754 },
	{ e: 34390352.170459114, oe: 219712827.0974047 },
	{ e: 34206444.18096381, oe: 220704924.70583653 },
	{ e: 33971881.718057334, oe: 221624821.47279766 },
	{ e: 33832864.728848375, oe: 222370865.92619252 },
	{ e: 33626411.1122782, oe: 223106983.67334154 },
	{ e: 33522345.99164168, oe: 223970145.8600353 },
	{ e: 33401630.0176464, oe: 224712864.66421634 },
	{ e: 33218229.78096182, oe: 225590008.67954814 },
	{ e: 33070559.892945264, oe: 226292531.5042141 },
	{ e: 32932838.386620436, oe: 227171855.38021487 },
	{ e: 32858251.45639166, oe: 227903449.55907926 },
	{ e: 32782547.237423085, oe: 228666010.5244892 },
	{ e: 32702726.62892523, oe: 229240011.42383343 },
	{ e: 32644390.806074467, oe: 229861761.80284902 },
	{ e: 32641499.039706327, oe: 230614830.1827496 },
	{ e: 32634014.223027244, oe: 231214849.24082342 },
	{ e: 32603889.920365, oe: 231805015.87374043 },
	{ e: 32609550.660881054, oe: 232283779.6676703 },
	{ e: 32654616.196929853, oe: 232815194.899139 },
	{ e: 32656588.5432795, oe: 233208217.41841155 },
	{ e: 32647992.68616926, oe: 233580743.11921605 },
	{ e: 32740875.44381314, oe: 234089848.5158074 },
	{ e: 32796830.197469056, oe: 234451773.07323864 },
	{ e: 32915318.530290604, oe: 234859760.06006107 },
	{ e: 32960530.285192456, oe: 235214689.27213854 },
	{ e: 33057616.632823873, oe: 235654950.94743583 },
	{ e: 33144100.85550902, oe: 235890060.79401976 },
	{ e: 33203799.806980707, oe: 236218826.26104262 },
	{ e: 33356599.660695817, oe: 236426172.2663505 },
	{ e: 33548494.505005863, oe: 236748908.6661277 },
	{ e: 33707753.24824688, oe: 236759732.6864546 },
	{ e: 33914879.55828712, oe: 237015980.48824948 },
	{ e: 34092386.0765622, oe: 237139127.28616923 },
	{ e: 34265866.6633178, oe: 237507827.27488285 },
	{ e: 34474577.744776934, oe: 237740702.26091683 },
	{ e: 34718226.31370984, oe: 237981244.01446113 },
	{ e: 34965342.44531884, oe: 238151348.68821 },
	{ e: 35238797.309986405, oe: 238276688.26254988 },
	{ e: 35498953.036292836, oe: 238521863.65114278 },
	{ e: 35757203.586666934, oe: 238746951.7445099 },
	{ e: 36077155.309022024, oe: 239048154.38158596 },
	{ e: 36428404.43942117, oe: 239262527.37218627 },
	{ e: 36716395.45780798, oe: 239423504.12713584 },
	{ e: 37058273.4489939, oe: 239520193.10627586 },
	{ e: 37453044.785709575, oe: 239851295.88963065 },
	{ e: 37848046.02406999, oe: 239956059.2366731 },
	{ e: 38250001.08195042, oe: 240119915.58080474 },
	{ e: 38660206.29462906, oe: 240352831.8982067 },
	{ e: 39060376.18793493, oe: 240569721.92031112 },
	{ e: 39442033.41109244, oe: 240682510.0488811 },
	{ e: 39900239.25962261, oe: 240994200.19725654 },
	{ e: 40484229.4392261, oe: 241426718.27288902 },
	{ e: 40855187.91410381, oe: 241493802.45853105 },
	{ e: 41406010.6343269, oe: 241790033.5636226 },
	{ e: 41962212.665457726, oe: 242044833.37185732 },
	{ e: 42443535.85165214, oe: 242316374.64484426 },
	{ e: 43008059.569215395, oe: 242622456.4340932 },
	{ e: 43660307.38568336, oe: 242981931.3807538 },
	{ e: 44309211.57833413, oe: 243584584.1184316 },
	{ e: 44928375.10260264, oe: 243924890.97163776 },
	{ e: 45641496.60662305, oe: 244421139.63228896 },
	{ e: 46303370.20588926, oe: 244883483.13670176 },
	{ e: 47048018.18301394, oe: 245423547.55793276 },
	{ e: 47830176.490309864, oe: 245930511.55562368 },
	{ e: 48644846.09676769, oe: 246561248.82241285 },
	{ e: 49463111.30526488, oe: 247242105.30855218 },
	{ e: 50261109.27132671, oe: 247899749.66773787 },
	{ e: 51201584.619092956, oe: 248649741.63487333 },
	{ e: 52093370.90462216, oe: 249344802.91715506 },
	{ e: 53088972.76581665, oe: 250185135.72125152 },
	{ e: 54059257.51502672, oe: 251007631.6001263 },
	{ e: 54992521.75894463, oe: 251709484.3766286 },
	{ e: 56053981.02253619, oe: 252591510.72324952 },
	{ e: 57295798.55151416, oe: 253673106.89282453 },
	{ e: 58465795.020685904, oe: 254672624.30741656 },
	{ e: 59681321.43333249, oe: 255757470.65409252 },
	{ e: 60849800.3574429, oe: 256846375.3335421 },
	{ e: 62133711.40869341, oe: 257993293.881329 },
	{ e: 63500613.77379753, oe: 259227706.804417 },
	{ e: 64996440.76278604, oe: 260626852.12675124 },
	{ e: 66361604.19727826, oe: 261871411.44960564 },
	{ e: 68059804.55766569, oe: 263388078.3690502 },
	{ e: 69580845.56653114, oe: 264750702.49791595 },
	{ e: 71094996.09444979, oe: 266106110.61994782 },
	{ e: 72727581.36988871, oe: 267599542.59287158 },
	{ e: 74303706.79487598, oe: 269083334.15929693 },
	{ e: 76168320.38763481, oe: 270867164.8295527 },
	{ e: 77861526.95306161, oe: 272498405.47539634 },
	{ e: 79647806.330846, oe: 274225834.62644744 },
	{ e: 81507977.74233668, oe: 276020244.0258671 },
	{ e: 83593068.65741588, oe: 278079214.80272734 },
	{ e: 85712856.59082575, oe: 280174743.61685216 },
	{ e: 87621775.12230535, oe: 282051871.9387451 },
	{ e: 89849129.46329576, oe: 284259898.9044109 },
	{ e: 92002838.69858587, oe: 286429076.37444204 },
	{ e: 94189507.1979275, oe: 288636508.7287355 },
	{ e: 96208657.24734582, oe: 290686322.74546117 },
	{ e: 98150481.71654092, oe: 292678628.0363694 },
	{ e: 99954156.4259163, oe: 294539638.90011275 },
	{ e: 101981600.45778655, oe: 296640040.49854285 },
	{ e: 103998506.1394262, oe: 299114678.75062996 },
	{ e: 108456926.71387267, oe: 304818146.7935219 },
	{ e: 112852617.75204879, oe: 310705872.2369836 },
	{ e: 116623324.40481682, oe: 316329865.0485553 },
	{ e: 120083598.69405504, oe: 321712554.851883 },
	{ e: 122781272.82121201, oe: 326192676.02097136 },
	{ e: 124952172.05386938, oe: 329948218.0103571 },
	{ e: 126198510.91063254, oe: 332501560.53031605 },
	{ e: 126773974.26563375, oe: 334071253.97575957 },
	{ e: 126874145.22311571, oe: 334855119.2639307 },
	{ e: 126067945.94928506, oe: 334594443.9150321 },
	{ e: 125275636.67275442, oe: 334131405.2093654 },
	{ e: 124169236.08822607, oe: 333197033.6071593 },
	{ e: 123157842.03970437, oe: 332290699.5990347 },
	{ e: 122232572.20368354, oe: 331432036.08104 },
	{ e: 121473193.1097896, oe: 330711210.91194266 },
	{ e: 120611323.75809115, oe: 329884030.0680851 },
	{ e: 120079928.73422326, oe: 329377177.37546444 },
	{ e: 119649209.04950757, oe: 328971257.3605094 },
	{ e: 119398804.351008, oe: 328696887.1434012 },
	{ e: 119138188.96934728, oe: 328421667.00183374 },
	{ e: 118932814.68420577, oe: 328231970.56717277 },
	{ e: 118701070.76724042, oe: 327994257.5220281 },
	{ e: 118573159.16374916, oe: 327867175.26736224 },
	{ e: 118371599.54716523, oe: 327691717.3719292 },
	{ e: 118281106.81403132, oe: 327600858.6231261 },
	{ e: 118195879.46971034, oe: 327507059.3090241 },
	{ e: 118087433.47069085, oe: 327400672.24829566 },
	{ e: 117995614.78661266, oe: 327317832.0041342 },
	{ e: 117916147.37800258, oe: 327246760.7388538 },
	{ e: 117855764.52230234, oe: 327193740.8038526 },
	{ e: 117785403.72972944, oe: 327115986.620784 },
	{ e: 117764937.54648687, oe: 327087435.72622734 },
	{ e: 117701197.96553884, oe: 327017449.39877343 },
	{ e: 117684345.3660873, oe: 327000299.80592024 },
	{ e: 117634413.71585484, oe: 326950781.42581326 },
	{ e: 117586954.32080412, oe: 326912289.38079417 },
	{ e: 117501079.55362737, oe: 326826260.77486753 },
	{ e: 117436601.24250568, oe: 326768749.71816885 },
	{ e: 117375782.28620592, oe: 326698610.86642855 },
	{ e: 117303931.90223163, oe: 326631496.43911254 },
	{ e: 117255994.36508453, oe: 326588197.0762739 },
	{ e: 117194175.68374029, oe: 326527101.7387632 },
	{ e: 117176759.1095773, oe: 326515555.5816386 },
	{ e: 117158622.5701533, oe: 326491479.8335159 },
	{ e: 117128261.31041576, oe: 326463772.5386195 },
	{ e: 117101234.53010271, oe: 326434253.279337 },
	{ e: 117067464.49503389, oe: 326397853.15365005 },
	{ e: 117029774.82860814, oe: 326345719.8362077 },
	{ e: 1.577200588393388e22, oe: 326301499.1750052 },
	{ e: 9.266687028029931, oe: 331594638.8085217 },
	{ e: 6.458590398902638, oe: 332994877.7276569 },
	{ e: 5.470747828941664, oe: 333357518.01641685 },
	{ e: 4.857655534265925, oe: 333452086.249894 },
	{ e: 4.406173895585719, oe: 333442618.39245373 },
	{ e: 4.062140184702294, oe: 333377071.0610713 },
	{ e: 3.811297844237332, oe: 332926755.5248763 },
	{ e: 3.6147435264996277, oe: 332694152.4836071 },
	{ e: 3.451190098990003, oe: 332315123.08786017 },
	{ e: 3.317351260435935, oe: 331704773.743167 },
	{ e: 3.198473049058453, oe: 331195976.80794096 },
	{ e: 3.1135046642013484, oe: 330709774.90635234 },
	{ e: 3.038569169217289, oe: 330109277.5980828 },
	{ e: 2.9746683453033045, oe: 329598573.35947865 },
	{ e: 2.92028440194544, oe: 329075092.46891075 },
	{ e: 2.871989405246868, oe: 328582336.37286127 },
	{ e: 2.8280883300771853, oe: 328013120.4141651 },
	{ e: 2.787085946801029, oe: 327518090.45262724 },
	{ e: 2.7531247931875025, oe: 327149666.61694807 },
	{ e: 2.7192772537917507, oe: 326532525.7019812 },
	{ e: 2.6891216471249155, oe: 325884454.8352234 },
	{ e: 2.6603754614561868, oe: 325325608.2075689 },
	{ e: 2.63243985377356, oe: 324697854.22740054 },
	{ e: 2.6097564961174866, oe: 324256921.1640446 },
	{ e: 2.5881606794134364, oe: 323913021.1689606 },
	{ e: 2.5700838673543878, oe: 323519541.2590908 },
	{ e: 2.5506232429414326, oe: 323166275.06895155 },
	{ e: 2.532661328145859, oe: 322662002.4827012 },
	{ e: 2.5155173720462334, oe: 322200678.86492664 },
	{ e: 2.5010413247815944, oe: 321902276.70715725 },
	{ e: 2.4860700750235454, oe: 321399743.54659593 },
	{ e: 2.473055165532729, oe: 320979042.8551358 },
	{ e: 2.4601376806342494, oe: 320552146.8164546 },
	{ e: 2.4477703060467815, oe: 320102852.4247552 },
	{ e: 2.436832441527225, oe: 319723026.787758 },
	{ e: 2.4258672414940134, oe: 319341355.7392849 },
	{ e: 2.4154974281474786, oe: 318969589.97484994 },
	{ e: 2.4052574048686624, oe: 318499703.9707939 },
	{ e: 2.3964571401389767, oe: 318189069.9157197 },
	{ e: 2.38740842474245, oe: 317832381.21302056 },
	{ e: 2.379016546004914, oe: 317409677.6726812 },
	{ e: 2.3707055388133034, oe: 317093475.6259235 },
	{ e: 2.3629039905031934, oe: 316791979.35655814 },
	{ e: 2.3554294883951385, oe: 316317435.9984483 },
	{ e: 2.348315382804374, oe: 316077351.8275257 },
	{ e: 2.340365662086761, oe: 315784213.84029603 },
	{ e: 2.3338957076253273, oe: 315597249.2293099 },
	{ e: 2.327655389595996, oe: 315298758.1273496 },
	{ e: 2.3216485909406113, oe: 314991597.6303033 },
	{ e: 2.3152966853561328, oe: 314704385.42928785 },
	{ e: 2.30909738827863, oe: 314440915.7391653 },
	{ e: 2.304631750222556, oe: 314165354.2571773 },
	{ e: 2.2993223547937167, oe: 313861597.7075743 },
	{ e: 2.2943951081497773, oe: 313642320.9053706 },
	{ e: 2.2898894757855395, oe: 313295803.0437763 },
	{ e: 2.285065130245471, oe: 313005376.12553746 },
	{ e: 2.28028497233101, oe: 312692039.41322136 },
	{ e: 2.2752932519112714, oe: 312428402.1299593 },
	{ e: 2.2710337138544907, oe: 312237165.1798365 },
	{ e: 2.2664613380530203, oe: 312016098.99728173 },
	{ e: 2.2629700840593467, oe: 311736250.1579373 },
	{ e: 2.2585583560690132, oe: 311523792.5224453 },
	{ e: 2.25445805533909, oe: 311237661.2052858 },
	{ e: 2.250352157435681, oe: 311027189.04600835 },
	{ e: 2.246915847572304, oe: 310784920.6119992 },
	{ e: 2.24380852521089, oe: 310573879.2120569 },
	{ e: 2.2399762557268352, oe: 310313803.1311458 },
	{ e: 2.2361978097410327, oe: 310096747.964921 },
	{ e: 2.2322676626683933, oe: 309873924.48290724 },
	{ e: 2.229124578441557, oe: 309674569.23663974 },
	{ e: 2.2257244994221126, oe: 309533546.6694497 },
	{ e: 2.2225565427651706, oe: 309298989.77436596 },
	{ e: 2.219334067533239, oe: 309067885.5917467 },
	{ e: 2.2161735088962278, oe: 308935752.4696476 },
	{ e: 2.213095962610902, oe: 308734393.4939188 },
	{ e: 2.2106254756148296, oe: 308587704.0496761 },
	{ e: 2.2080524174930383, oe: 308386046.18155706 },
	{ e: 2.205468470904442, oe: 308189960.50860745 },
	{ e: 2.2029206029625925, oe: 308011402.79893374 },
	{ e: 2.2007032987821833, oe: 307873598.97379506 },
	{ e: 2.19859282525401, oe: 307713078.8265052 },
	{ e: 2.1959854790594067, oe: 307465240.5310674 },
	{ e: 2.193731675244651, oe: 307359631.06960094 },
	{ e: 2.1913680611462483, oe: 307173536.98839384 },
	{ e: 2.188704414366594, oe: 306965550.65158504 },
	{ e: 2.1866863543403063, oe: 306788471.0648393 },
	{ e: 2.1846046550804523, oe: 306684723.61440027 },
	{ e: 2.1825067764993236, oe: 306505181.47919846 },
	{ e: 2.180688300274506, oe: 306427334.20844316 },
	{ e: 2.179020833891702, oe: 306297637.42599076 },
	{ e: 2.177526427468254, oe: 306208915.883451 },
	{ e: 2.1756324762870167, oe: 306093048.0877971 },
	{ e: 2.1739241770536704, oe: 305995733.1018653 },
	{ e: 2.172233516797211, oe: 305866067.2330641 },
	{ e: 2.170514872165299, oe: 305724989.70018727 },
	{ e: 2.168919021454931, oe: 305635171.08555174 },
	{ e: 2.1673084572141135, oe: 305535843.3478881 },
	{ e: 2.165764232895955, oe: 305392344.4601849 },
	{ e: 2.164532249812956, oe: 305287047.89604545 },
	{ e: 91451659.8013007, oe: 305199340.0614075 },
	{ e: 88345595.57196051, oe: 302093631.25384676 },
]
// #endregion data

export const LogScaleLineChartRegression: React.FC = memo(
	function LogScaleLineChartRegression() {
		return (
			<Chart width={500} height={200} padding={{ left: 60 }} data={{ data }}>
				<LinearScale
					name="x"
					domain={[0, data.length]}
					range={Dimension.Width}
				/>
				<LogScale name="y" domain="data.oe" range={Dimension.Height} zero />
				<Axis orient={AxisOrientation.Bottom} scale="x" />
				<Axis orient={AxisOrientation.Left} scale="y" />
				<Line
					table="data"
					x={({ index, x }) => x(index)}
					y={({ d, y }) => y(d.oe)}
					stroke="blue"
					strokeWidth={1}
				/>
			</Chart>
		)
	},
)
