-- Seed: 50 venues across IT(14), FR(12), ES(10), PT(7), UK(7)

INSERT INTO venues (slug,name,country,region,nearest_city,nearest_airport_code,nearest_airport_name,airport_drive_minutes,lat,lng,venue_types,capacity_min,capacity_max,price_band,estimated_price_eur_min,estimated_price_eur_max,seasons,onsite_accommodation,onsite_beds,in_house_catering,ceremony_and_reception,outdoor_ceremony,indoor_backup,exclusive_use,pet_friendly,short_description,long_description,highlights,tags,hero_image_url,gallery_image_urls,is_featured) VALUES

-- ── ITALY ──────────────────────────────────────────────────────────────────

('villa-serafina-tuscany','Villa Serafina','IT','Tuscany','Florence','FLR','Florence Peretola Airport',40,43.4623,11.1059,'{villa}',60,150,'$$$',22000,38000,'{spring,summer,autumn}',true,18,true,true,true,true,true,false,
'A sixteenth-century stone villa set among Chianti vineyards, with a cypress-lined drive, a loggia for outdoor dining, and sweeping views over the Sienese hills.',
'Villa Serafina sits at the heart of the Chianti Classico wine region, surrounded by vineyards and olive groves that have been tended for five centuries. The main villa, built in 1572, retains its original stone staircase, terracotta floors, and frescoed ceilings, while the surrounding estate has been sensitively restored to provide every modern comfort without disturbing the patina of age.

The ceremony terrace overlooks a formal Italian garden with stone balustrades and a central fountain — a backdrop that requires no decoration. In the evenings, the loggia becomes a candlelit dining hall open to the warm Tuscan air, with the estate''s own Chianti Classico served from the cellar beneath your feet.

Accommodation for up to 18 guests is spread across the main villa and three farmhouse cottages, all furnished with antiques and local linen. The in-house catering team specialises in farm-to-table Tuscan cuisine, drawing from the kitchen garden and nearby producers.',
'{"Ceremony terrace with vineyard panorama","In-house Chianti Classico from estate wine cellar","Farm-to-table Tuscan catering team","18-bed private accommodation on site","Loggia for outdoor dining and dancing"}',
'{"tuscany","vineyard","chianti","villa","olive-grove","romantic","luxury"}',
'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=80',
'{"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"}',
true),

('castello-di-monte-umbria','Castello di Monte','IT','Umbria','Perugia','PEG','Perugia San Francesco Airport',25,43.1122,12.3888,'{castle}',40,120,'$$$$',42000,65000,'{spring,summer,autumn}',true,22,true,true,true,true,true,false,
'A fully restored medieval castle on a hilltop in the Umbrian countryside, with a private chapel, banqueting hall, and 22-bed accommodation across the castle''s historic rooms.',
'Castello di Monte commands a hilltop between Perugia and Assisi, visible for miles across the Umbrian plain. The castle was built in the 13th century and has passed through the hands of noble families for seven hundred years before its meticulous restoration in the early 2000s.

The private chapel seats 60 and retains its original fresco cycle. The banqueting hall — a vaulted stone room lit by iron chandeliers — holds 120 for dinner. In summer, the courtyard becomes the most dramatic outdoor dining space imaginable, its crenellated walls glowing amber in the evening light.

With 22 bedrooms in the castle and adjoining tower, the entire property is yours exclusively for the wedding weekend. The chef and his team source from Umbrian farms and truffle hunters to create menus that celebrate the region''s extraordinary larder.',
'{"Private 13th-century chapel with original frescoes","Full exclusive use of castle and grounds","22 bedrooms across castle and tower","Truffle-focused Umbrian tasting menus","Hilltop views to Assisi and Perugia"}',
'{"umbria","castle","medieval","exclusive","hilltop","chapel","luxury"}',
'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
'{"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"}',
true),

('masseria-la-luce-puglia','Masseria La Luce','IT','Puglia','Bari','BRI','Bari Karol Wojtyla Airport',55,40.6347,17.9351,'{farmhouse,country_estate}',50,130,'$$$',20000,35000,'{spring,summer,autumn}',true,16,true,true,true,false,true,true,
'A whitewashed masseria amid ancient olive trees in the Valle d''Itria, with a trullo ceremony space, heated pool, and farm-to-table dinners served under a pergola.',
'Masseria La Luce stands in the heart of the Valle d''Itria, surrounded by ancient olive trees — some more than a thousand years old — and the distinctive trulli that make this corner of Puglia unlike anywhere else in the world. The property has been farmed continuously since the 17th century and today operates as a working olive oil estate.

The ceremony space is a converted trullo cluster, its distinctive conical roofs creating a backdrop of pure Puglian character. Dinners are served on the long stone terrace beneath a flowering wisteria pergola, lit by hundreds of lanterns as the sun drops behind the olive groves.

The estate grows its own vegetables, presses its own olive oil, and produces its own wine — all of which appear on the wedding menu. Sixteen bedrooms in the masseria and converted trulli sleep the wedding party in style, with the heated pool and lounging terraces all to yourselves.',
'{"Ancient trullo ceremony space","1,000-year-old olive grove setting","Heated pool and private terraces","Estate olive oil and wine production","Pet-friendly grounds"}',
'{"puglia","masseria","trulli","olive-grove","rustic","farm-to-table","pet-friendly"}',
'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
'{"https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"}',
true),

('villa-bellavista-como','Villa Bellavista','IT','Lake Como','Milan','MXP','Milan Malpensa Airport',75,45.9564,9.2597,'{villa,historic_manor}',40,100,'$$$$',45000,70000,'{spring,summer,autumn}',true,14,true,true,true,true,true,false,
'A Belle Époque villa directly on Lake Como''s western shore, with a private jetty, frescoed ballroom, and terraced gardens descending to the water''s edge.',
'Villa Bellavista occupies one of the most coveted positions on Lake Como''s western shore, its private gardens descending in a series of stone terraces to a jetty where guests may arrive by water taxi from Bellagio or Como. The villa was built in 1887 for a Milanese industrialist and still carries the grandeur of the Belle Époque in every detail — painted ceilings, parquet ballrooms, and the kind of proportions that the 19th century did so well.

The ceremony terrace overlooks the lake, framing the snow-capped Alps as a backdrop that no florist could improve upon. The ballroom opens directly onto the main garden terrace for dancing under the stars, with lanterns reflected in the still waters below.

Fourteen bedrooms in the villa sleep the immediate wedding party, while local hotels and villas accommodate further guests just minutes away by boat.',
'{"Private jetty with water-taxi access","Frescoed Belle Époque ballroom","Lake and Alp panorama from ceremony terrace","Arrival by boat from Como or Bellagio","Intimate 14-bedroom villa exclusivity"}',
'{"lake-como","villa","belle-epoque","lakeside","luxury","northern-italy"}',
'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80',
'{"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"}',
true),

('tenuta-san-rocco-amalfi','Tenuta San Rocco','IT','Amalfi Coast','Naples','NAP','Naples International Airport',80,40.6340,14.6027,'{villa,coastal}',30,80,'$$$$',40000,60000,'{spring,summer,autumn}',true,10,true,true,true,true,true,false,
'A cliffside estate on the Amalfi Coast with sea-view terraces, a lemon grove ceremony space, and direct access to a private cove below.',
'Tenuta San Rocco clings to the cliffs above Positano, its terraced gardens cascading toward the Tyrrhenian Sea in a series of lemon groves, bougainvillea-draped pergolas, and infinity-edged pools. The estate dates to the 18th century and was restored with obsessive care — every stone wall, majolica floor tile, and painted arch preserved.

The ceremony takes place in the lemon grove, shaded by trees that have produced fruit for the estate''s limoncello for two hundred years. The sea stretches endlessly behind the altar — blue on blue on blue. After the ceremony, guests follow the cliff path to the private cove for an aperitivo on the water.

Dinner is served on the main terrace as the lights of fishing boats appear below. The chef works exclusively with local fishermen and the estate''s own produce. Accommodation for ten in the villa''s suites ensures the wedding party stays together.',
'{"Lemon-grove ceremony with Tyrrhenian Sea backdrop","Private cove with water access","Infinity pool overlooking Positano","Local seafood and estate limoncello","Cliff path between terrace and cove"}',
'{"amalfi","coastal","cliffside","lemon-grove","luxury","southern-italy","sea-view"}',
'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
'{"https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80"}',
true),

('palazzo-fiorentino-florence','Palazzo Fiorentino','IT','Tuscany','Florence','FLR','Florence Peretola Airport',20,43.7696,11.2558,'{palazzo,historic_manor}',60,200,'$$$',25000,42000,'{spring,summer,autumn,winter}',false,0,true,true,false,true,false,false,
'A 15th-century Florentine palazzo in the historic centre, available for exclusive evening receptions with its piano nobile, frescoed salons, and private courtyard.',
'Palazzo Fiorentino stands on a quiet street in the historic centre of Florence, its austere Renaissance exterior giving no hint of the magnificence within. Built in 1487 for a prominent banking family, the piano nobile retains three successive generations of artistic patronage — frescoed ceilings, carved marble doorways, and gilded mirrors that have reflected candlelight for over five centuries.

The palazzo is available for exclusive evening events from 6pm onwards, allowing the daytime to be reserved for your ceremony at a nearby church or chapel. The private courtyard, centered on a stone well and surrounded by loggia arches, is the perfect aperitivo space before guests move inside to the salons.

The in-house catering team works exclusively with Florentine and Tuscan produce, offering Bistecca alla Fiorentina, fresh pasta made on site, and wines from estates that have supplied Florentine tables for generations.',
'{"15th-century piano nobile with original frescoes","Private Renaissance courtyard","Exclusive evening hire from 6pm","Walking distance to Duomo and major churches","Florentine tasting menus with Bistecca station"}',
'{"florence","palazzo","renaissance","historic","evening-reception","city"}',
'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200&q=80',
'{"https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"}',
false),

('agriturismo-belvedere-sicily','Agriturismo Belvedere','IT','Sicily','Catania','CTA','Catania-Fontanarossa Airport',60,37.5079,14.1699,'{farmhouse,country_estate}',40,100,'$$',10000,18000,'{spring,autumn,winter}',true,12,true,true,true,false,true,true,
'A working farm and agriturismo on the slopes of Mount Etna, with volcanic-stone terraces, pistachio grove dining, and views of the volcano and the Ionian Sea.',
'Agriturismo Belvedere sits at 700 metres on the southern slopes of Mount Etna, surrounded by pistachio orchards, citrus groves, and vineyards that produce wines unique to Etna''s volcanic soils. The farmhouse, built from the local lava stone in the late 18th century, has been in the same family for four generations.

The ceremony takes place on the main terrace, with the smoking crater of Etna rising above and the Ionian Sea glittering in the distance — a backdrop of almost surreal drama. Dinners are served in the pistachio grove, long tables set between the trees, lit by fire torches as dusk settles over the mountain.

The kitchen produces everything from the farm: olive oil, wine, pistachios, lemons, and honey. The Sicilian menu — arancini, fresh pasta alla Norma, grilled swordfish, cassata — is among the most distinctive of any venue in our collection.',
'{"Mount Etna crater as ceremony backdrop","Dinner in the pistachio grove","Estate wine from volcanic soils","Etna and Ionian Sea panorama","Authentic Sicilian farm-to-table cuisine"}',
'{"sicily","etna","farmhouse","agriturismo","volcanic","pistachio","authentic"}',
'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
'{"https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80","https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"}',
false),

('villa-rosa-lake-garda','Villa Rosa','IT','Lake Garda','Verona','VRN','Verona Villafranca Airport',45,45.5244,10.6287,'{villa}',50,130,'$$$',24000,40000,'{spring,summer,autumn}',true,16,false,true,true,true,true,true,
'A romantic lakeside villa on the eastern shore of Lake Garda, with a walled rose garden, a stone ceremony pergola, and accommodation in 16 lakefront suites.',
'Villa Rosa stands at the water''s edge on Lake Garda''s less-visited eastern shore, its walled garden perfumed with over four hundred rose varieties from late May through September. The villa was built in 1901 for a Veronese count who wanted a retreat with views across the lake to the mountains of Trentino, and its terraces and gardens retain the romantic grandeur of the Edwardian era.

The stone ceremony pergola, draped in climbing roses and wisteria, is among the most photographed wedding spaces in northern Italy. After the ceremony, guests move through the garden to the lakeside terrace for aperitivo as the setting sun illuminates the western mountains in shades of amber and rose.

Sixteen lakefront suites in the villa sleep the wedding party with views across the water. The estate works with local caterers who specialise in Garda''s freshwater fish and the DOC wines of the eastern shore — Bardolino, Custoza, and Lugana.',
'{"Walled garden with 400+ rose varieties","Stone pergola draped in climbing roses","Lakeside terrace for aperitivo at sunset","16 lakefront suites for the wedding party","Pet-friendly grounds"}',
'{"lake-garda","villa","roses","lakeside","romantic","northern-italy","pet-friendly"}',
'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
'{"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80"}',
false),

('relais-montefalco-umbria','Relais Montefalco','IT','Umbria','Perugia','PEG','Perugia San Francesco Airport',30,42.8920,12.6527,'{vineyard,country_estate}',60,140,'$$',14000,24000,'{spring,summer,autumn}',true,20,true,true,true,true,false,false,
'A wine estate in the hills above Montefalco, surrounded by Sagrantino vineyards, with a barrel-vaulted cellar reception room and panoramic terraces.',
'Relais Montefalco sits on a ridge above the wine town of Montefalco — the "balcony of Umbria" — with views stretching to the Sibillini mountains on clear days. The estate produces Sagrantino di Montefalco, one of Italy''s most tannic and age-worthy red wines, and the vineyards that surround the property turn from green to burgundy to gold through the autumn months.

The ceremony takes place on the main terrace, where a stone arch frames the vine-covered valley below. Receptions move to the barrel-vaulted wine cellar for dinner — an intimate, candlelit space that holds 140 beneath ancient stone vaulting, with the estate''s wines served directly from the barrels that line the walls.

Twenty bedrooms in the main relais and adjacent farmhouses accommodate the wedding party and extended family.',
'{"Sagrantino vineyard panorama","Barrel-vaulted cellar reception room","Estate wine tastings and cellar tour","20 bedrooms across relais and farmhouses","Autumn harvest wedding backdrop"}',
'{"umbria","montefalco","vineyard","wine","barrel-cellar","romantic","country"}',
'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
'{"https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80"}',
false),

('villa-al-tramonto-sardinia','Villa al Tramonto','IT','Sardinia','Cagliari','CAG','Cagliari Elmas Airport',50,39.2238,9.1217,'{villa,coastal}',40,100,'$$$',28000,45000,'{spring,summer,autumn}',true,12,false,true,true,false,true,false,
'A contemporary villa above the Costa Smeralda with a sea-view infinity pool, pine-scented ceremony terrace, and dedicated wedding suite with panoramic balcony.',
'Villa al Tramonto perches on a hillside above the Costa Smeralda, the Sardinian coastline stretching in a crescent of turquoise and jade below. The villa is a study in understated Mediterranean luxury — white limestone, local juniper wood, and glass that frames the sea from every room.

The ceremony terrace faces due west so the sun sets behind the couple during the vows — a coincidence of geography that the original architect planned with care. The infinity pool appears to merge with the Tyrrhenian Sea, and the scent of Sardinian maquis drifts through the pines. Twelve elegant bedrooms in the villa sleep the immediate wedding party.',
'{"West-facing ceremony terrace for sunset vows","Infinity pool merging with sea horizon","Costa Smeralda panorama","12-bedroom villa exclusivity","Sardinian maquis-scented pine gardens"}',
'{"sardinia","coastal","sea-view","luxury","contemporary","infinity-pool"}',
'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
'{"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80"}',
false),

('tenuta-del-bosco-maremma','Tenuta del Bosco','IT','Tuscany','Grosseto','GRS','Grosseto Airport',35,42.6782,11.1313,'{country_estate,farmhouse}',60,150,'$$',12000,22000,'{spring,summer,autumn}',true,24,true,true,true,true,false,true,
'A coastal Tuscan estate in the Maremma with cork-oak forests, organic vineyards, a stone farmhouse reception hall, and 24 beds spread across restored farm buildings.',
'Tenuta del Bosco lies in the wild coastal strip of the Maremma — Tuscany''s less-visited southwestern corner, where cork-oak forests meet the Tyrrhenian Sea and wild boar roam the scrubland at dusk. The 80-hectare estate produces organic wine, olive oil, and honey, and the farmhouse at its centre has been painstakingly restored to preserve its rough-hewn stone walls, brick vaulting, and terracotta floors.

The ceremony takes place in the estate''s private clearing in the cork-oak forest — a natural amphitheatre of ancient trees where dappled light falls through the canopy. Dinners are served in the stone farmhouse, whose doors open wide to the terrace and the evening breeze off the sea. With 24 beds on site, the wedding party has the entire estate to itself from Friday to Sunday.',
'{"Cork-oak forest ceremony clearing","Organic Maremma wine and olive oil","Stone farmhouse with terracotta floors","24 beds across restored farm buildings","Wild coastal landscape just 5km from sea"}',
'{"maremma","tuscany","organic","cork-oak","farmhouse","coastal","pet-friendly"}',
'https://images.unsplash.com/photo-1533050487297-09b450131914?w=1200&q=80',
'{"https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80","https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80"}',
false),

('villa-dei-noci-emilia','Villa dei Noci','IT','Emilia-Romagna','Bologna','BLQ','Bologna Guglielmo Marconi Airport',40,44.4219,11.3621,'{villa,historic_manor}',50,120,'$$',11000,20000,'{spring,summer,autumn}',true,14,true,true,true,true,true,false,
'A Bolognese villa with a walnut-grove garden, a Palladian loggia for outdoor dining, and proximity to the Lambrusco wine estates of the Po plain.',
'Villa dei Noci takes its name from the ancient walnut trees that shade its formal garden — trees that were already old when the villa was built in the 18th century. The property sits on a low ridge south of Bologna, looking out over the Po plain toward the Apennines, and its Palladian loggia has sheltered wedding dinners for generations of Bolognese families.

The ceremony garden is arranged around a central fountain beneath the walnut canopy. After the ceremony, guests move to the loggia for aperitivo of mortadella, prosciutto di Parma, and local Lambrusco — the definitive Emilian combination. The in-house kitchen continues the theme: fresh pasta made by the estate''s sfoglina, ragù Bolognese, Parmesan aged on the premises.',
'{"Ancient walnut grove ceremony garden","Palladian loggia for outdoor dining","In-house pasta-making sfoglina","Lambrusco and Pignoletto wine estate nearby","14 bedrooms in the villa"}',
'{"emilia-romagna","bologna","villa","pasta","lambrusco","palladian","garden"}',
'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80',
'{"https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"}',
false),

('masseria-sant-angelo-basilicata','Masseria Sant''Angelo','IT','Basilicata','Bari','BRI','Bari Karol Wojtyla Airport',90,40.3941,16.1524,'{farmhouse}',40,90,'$',5000,9000,'{spring,autumn}',true,10,false,true,true,false,true,true,
'A remote masseria in the Basilicata highlands with panoramic Apennine views, a ceremony clearing beneath centuries-old olive trees, and honest southern Italian hospitality.',
'Masseria Sant''Angelo sits in the Basilicata highlands, a region that remains one of southern Italy''s best-kept secrets. The masseria — a fortified farm typical of this part of the Mezzogiorno — has been in the same family since the 17th century and is run today with a fierce commitment to authenticity.

The ceremony clearing sits beneath six ancient olive trees whose combined age exceeds two thousand years. There is no decoration needed. The mountains of the Apennines rise in every direction, and the only sounds are wind, birds, and the distant bells of a village church.

It is not a place for grand productions. It is a place for couples who understand that simplicity, when it is this genuine, is its own kind of luxury.',
'{"Two-thousand-year-old olive trees","Remote Apennine mountain setting","Authentic southern Italian hospitality","Pet-friendly grounds","Rare budget-accessible price point"}',
'{"basilicata","masseria","remote","apennines","authentic","budget","olive-trees","pet-friendly"}',
'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
'{"https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"}',
false),

-- ── FRANCE ────────────────────────────────────────────────────────────────

('domaine-de-la-lumiere-provence','Domaine de la Lumière','FR','Provence','Marseille','MRS','Marseille Provence Airport',65,43.7102,5.0800,'{chateau,country_estate}',60,150,'$$$',24000,40000,'{spring,summer,autumn}',true,20,true,true,true,true,true,false,
'A working lavender and olive estate in the Luberon, with a stone bastide, a ceremony garden framed by cypress trees, and 20-bed accommodation in the main house and stone gîtes.',
'Domaine de la Lumière occupies the southern slopes of the Luberon massif, its fields striped with lavender rows that bloom violet-blue in June and July. The bastide — a classic Provençal stone farmhouse of unusual grandeur — was built in the 18th century when this part of Provence was wealthy from olive oil and wine.

The ceremony garden is enclosed by a double row of hundred-year-old cypress trees that channel the Mistral and frame the altar against the lavender fields beyond. In summer, the scent of lavender, thyme, and rosemary fills the air from dawn to dusk. Dinners are served on the bastide terrace, where the stone walls retain the heat of the day long into the night.

Twenty beds in the main bastide and four stone gîtes allow the wedding party to inhabit the estate fully for the weekend. The estate''s own rosé and olive oil feature at every table.',
'{"Lavender fields in bloom (June–July)","Cypress-lined ceremony garden","Estate rosé and olive oil at every table","20 beds across bastide and gîtes","Luberon National Park location"}',
'{"provence","lavender","bastide","luberon","olive","rose-wine","romantic"}',
'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80',
'{"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"}',
true),

('chateau-saint-martin-loire','Château Saint-Martin','FR','Loire Valley','Tours','TUF','Tours Val de Loire Airport',30,47.3656,0.6887,'{chateau,vineyard}',70,180,'$$$$',45000,75000,'{spring,summer,autumn}',true,28,true,true,true,true,true,false,
'A Renaissance château in the Loire Valley with formal French gardens, a private chapel, cave-cellars for champagne receptions, and 28 bedrooms in the château and adjoining pavilions.',
'Château Saint-Martin is one of the most complete Renaissance châteaux in private hands in the Loire Valley — a fairy-tale complex of towers, moats, and formal gardens that speaks to an era when the kings of France made this valley the garden of France. Built in the early 16th century and extended through the 17th, the château has been in the same family for four generations and is maintained with the devotion that only private ownership can sustain.

The formal French garden, designed in the tradition of André Le Nôtre, provides the grandest ceremony backdrop in our entire collection — 400 metres of clipped box hedging, geometric parterres, and a central axis that draws the eye to the horizon. The private chapel, consecrated in 1512, seats 80 for a religious ceremony. After the vows, guests descend to the tuffeau cave-cellars for a champagne reception among the barrels.

Twenty-eight bedrooms in the château, towers, and pavilions sleep the entire extended wedding party in rooms of extraordinary historical character.',
'{"One of the Loire''s finest Renaissance châteaux","André Le Nôtre-style formal gardens","16th-century private chapel for 80","Cave-cellar champagne reception","28 bedrooms across château and pavilions"}',
'{"loire-valley","chateau","renaissance","formal-gardens","champagne","chapel","luxury"}',
'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
'{"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80"}',
true),

('mas-de-la-garrigue-provence','Mas de la Garrigue','FR','Provence','Avignon','AVN','Avignon-Provence Airport',25,43.8503,4.8357,'{farmhouse,country_estate}',50,120,'$$',13000,22000,'{spring,summer,autumn}',true,18,false,true,true,true,false,true,
'A golden-stone mas in the garrigue between Avignon and the Alpilles, with a shaded ceremony courtyard, herbal gardens, and 18 beds across the farmhouse and stone outbuildings.',
'Mas de la Garrigue sits in the aromatic scrubland between Avignon and Les Baux-de-Provence, its walls the warm honey colour of the local limestone. The property has functioned as a farm since the 17th century, and its working kitchen garden still supplies the table with herbs, vegetables, and fruit from March through November.

The ceremony courtyard is enclosed on three sides by the mas''s stone walls and shaded by a 200-year-old plane tree that spreads its canopy over the entire space. In summer, the temperature beneath the plane tree is ten degrees cooler than in the surrounding garrigue — a detail that guests remember. Dinners are served in the courtyard as the plane tree glows amber in the last of the evening light.',
'{"200-year-old plane tree shading ceremony courtyard","Working kitchen garden supplying the table","Garrigue setting between Avignon and Alpilles","18 beds across farmhouse and outbuildings","Pet-friendly grounds"}',
'{"provence","mas","garrigue","plane-tree","avignon","alpilles","garden","pet-friendly"}',
'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
'{"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80"}',
false),

('chateau-de-belveze-dordogne','Château de Belvèze','FR','Dordogne','Bergerac','EGC','Bergerac Périgord Dordogne Airport',40,44.8211,0.9302,'{chateau}',60,160,'$$$',26000,44000,'{spring,summer,autumn}',true,22,true,true,true,true,true,false,
'A Périgord Noir château with a river-view terrace, a medieval banqueting hall, and its own Bergerac AOC wine estate producing ceremony wines.',
'Château de Belvèze rises from a limestone escarpment above the Dordogne river, its pepper-pot towers reflected in the brown-green water below. Built in the 13th century as a stronghold and expanded in the 15th for comfort, the château today is a privately-owned estate producing Bergerac AOC wines that are among the region''s best.

The river-view terrace holds 160 for an outdoor ceremony or dinner, with the Dordogne winding through its valley below and walnut orchards on the far bank. The medieval banqueting hall — with its stone fireplace large enough to stand in — is the setting for indoor receptions, dancing, and late-night celebration.',
'{"River Dordogne panorama from ceremony terrace","Own-production Bergerac AOC wines","Medieval banqueting hall with walk-in fireplace","22 bedrooms in château and towers","Périgord Noir walnuts and truffles on the menu"}',
'{"dordogne","chateau","medieval","bergerac","river","wine","perigord"}',
'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
'{"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"}',
false),

('villa-saint-exupery-cote-dazur','Villa Saint-Exupéry','FR','Côte d''Azur','Nice','NCE','Nice Côte d''Azur Airport',30,43.7034,7.2663,'{villa,coastal}',40,100,'$$$$',50000,80000,'{spring,summer,autumn}',true,12,true,true,true,false,true,false,
'A Belle Époque villa in the hills above Nice with a terraced garden descending to an infinity pool, a sea-view ceremony pergola, and 12 suites with Riviera panoramas.',
'Villa Saint-Exupéry commands a hillside above Nice, its Belle Époque architecture and terraced gardens recalling the Riviera''s golden age when artists, writers, and royalty colonised this coastline. The villa was built in 1903 and has been restored to its original splendour, with painted ceilings, marble floors, and ironwork balconies framing the Mediterranean below.

The ceremony pergola, draped in bougainvillea and jasmine, overlooks the Bay of Angels from a position that has no equal in our collection. The infinity pool below seems to pour into the sea itself. Twelve suites in the villa sleep the wedding party in rooms where the Riviera light — clear, golden, exact — fills every corner from dawn to dusk.',
'{"Bay of Angels panorama from ceremony pergola","Bougainvillea-draped Belle Époque terraces","Infinity pool above Nice","12 Riviera suites in historic villa","Michelin-recommended in-house chef"}',
'{"cote-dazur","nice","riviera","belle-epoque","sea-view","luxury","bougainvillea"}',
'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
'{"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"}',
true),

('domaine-les-cigales-languedoc','Domaine les Cigales','FR','Languedoc','Montpellier','MPL','Montpellier Méditerranée Airport',55,43.5927,3.3490,'{vineyard,farmhouse}',60,140,'$$',11000,19000,'{spring,summer,autumn}',true,16,false,true,true,true,false,true,
'A Languedoc wine domaine with vine-covered ceremony terraces, a stone reception barn, and direct access to a garrigue hiking trail through the Cévennes foothills.',
'Domaine les Cigales produces Languedoc Roussillon wines from 45 hectares of old-vine Grenache, Syrah, and Carignan. The stone farmhouse and reception barn sit at the centre of the estate, surrounded on all sides by vines that turn from green to crimson in October.

The ceremony takes place on the upper terrace, where the vines form a natural amphitheatre and the garrigue scrubland of the Cévennes hills rises behind. The stone reception barn, with its exposed timber roof and flagged floor, holds 140 for dinner and dancing. In summer, the barn doors open wide to the terrace and the scent of thyme and rosemary drifts in from the surrounding scrubland.',
'{"45 hectares of old-vine Languedoc vineyards","Vine amphitheatre ceremony terrace","Stone barn for 140 dinner guests","Direct access to Cévennes garrigue trails","Pet-friendly wine estate"}',
'{"languedoc","vineyard","wine","stone-barn","garrigue","cevennes","autumn","pet-friendly"}',
'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
'{"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80"}',
false),

('manoir-de-la-bruyere-normandy','Manoir de la Bruyère','FR','Normandy','Caen','CFR','Caen-Carpiquet Airport',40,49.1817,-0.3596,'{historic_manor,country_estate}',50,120,'$$$',22000,36000,'{spring,summer,autumn}',true,18,true,true,true,true,true,false,
'A Norman manor with half-timbered architecture, a walled orchard ceremony space, a rose garden, and 18 bedrooms in the main house and converted stables.',
'Manoir de la Bruyère is quintessential Normandy: half-timbered walls, slate roof, walled orchard, and a kitchen garden planted with varieties that haven''t changed in two hundred years. The manor sits on a quiet country lane in the Pays d''Auge, the heart of the Norman dairy and apple country, within reach of the D-Day beaches, the Bayeux Tapestry, and the abbeys of Caen.

The walled orchard provides the most distinctively Norman ceremony space imaginable — apple trees in blossom in April and May, hung with lanterns for evening receptions in summer and heavy with fruit in October. The rose garden, planted in the 1920s, provides cut flowers for tables and buttonholes. The kitchen team works with Norman cream, butter, Camembert, cider, and calvados to create menus rooted entirely in the terroir.',
'{"Walled orchard in blossom (April–May) or harvest (October)","1920s rose garden for table flowers","Norman cuisine with local cheese and calvados","18 beds across manor and converted stables","Easy day trips to D-Day sites and Bayeux"}',
'{"normandy","manor","half-timbered","orchard","rose-garden","french","historic"}',
'https://images.unsplash.com/photo-1520637836993-5b480e1e60c4?w=1200&q=80',
'{"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"}',
false),

('chateau-montagne-bordeaux','Château Montagne','FR','Bordeaux','Bordeaux','BOD','Bordeaux-Mérignac Airport',45,44.8937,-0.0728,'{chateau,vineyard}',60,150,'$$$',28000,48000,'{spring,summer,autumn}',true,20,true,true,false,true,true,false,
'A Saint-Émilion grand cru château with a vine-surrounded ceremony space, a barrel-cellar reception, and accommodation in a converted wine estate.',
'Château Montagne is a Saint-Émilion grand cru estate whose wines appear on the lists of Michelin three-star restaurants from London to Tokyo. The château sits on the limestone plateau above Saint-Émilion, surrounded by some of the world''s most celebrated vineyards, its gravelled forecourt, stone chai, and turreted towers the definitive image of Bordeaux wine culture.

The ceremony takes place in the vine-surrounded meadow adjacent to the château, with the grand cru vineyards as a backdrop. Receptions move to the barrel-cellar chai — a cathedral-like space of stone arches and oak barrels, lit by candlelight, where the estate''s wine is poured throughout dinner. Twenty bedrooms in the estate''s converted buildings sleep the wedding party.',
'{"Saint-Émilion grand cru estate","Barrel-cellar chai for up to 150","Vine-surrounded ceremony meadow","Grand cru wine poured throughout dinner","20 bedrooms in converted estate buildings"}',
'{"bordeaux","saint-emilion","chateau","vineyard","grand-cru","wine","barrel-cellar"}',
'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
'{"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"}',
true),

('domaine-saint-hilaire-alsace','Domaine Saint-Hilaire','FR','Alsace','Strasbourg','SXB','Strasbourg Airport',50,48.1619,7.3126,'{vineyard,farmhouse}',40,100,'$$',9000,16000,'{spring,summer,autumn}',true,14,false,true,true,false,false,false,
'An Alsatian wine domaine with flower-box half-timbered buildings, a Riesling vineyard ceremony space, and the distinctive character of the Route des Vins.',
'Domaine Saint-Hilaire sits on the Alsatian wine route between Riquewihr and Ribeauvillé, its half-timbered buildings decorated with the elaborate flower boxes that are the trademark of this improbably picturesque wine region. The domaine produces Riesling, Gewurztraminer, and Pinot Gris from vineyards that face south-east on the Vosges foothills.

The ceremony space is the domaine''s grand cru vineyard parcel, where the vines — some planted in the 1950s — create a naturally theatrical setting. Fourteen bedrooms in the main domaine buildings sleep the wedding party with views over the vineyards toward the Rhine plain.',
'{"Alsatian wine route location with grand cru vines","Half-timbered buildings with traditional flower boxes","Riesling and Gewurztraminer vineyard ceremony","14 bedrooms with Rhine plain views","Village of Riquewihr 5 minutes away"}',
'{"alsace","riesling","wine-route","half-timbered","vineyard","flower-boxes","romantic"}',
'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=80',
'{"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"}',
false),

('domaine-des-iris-provence','Domaine des Iris','FR','Provence','Aix-en-Provence','MRS','Marseille Provence Airport',35,43.5297,5.4474,'{country_estate,farmhouse}',50,110,'$$',12000,20000,'{spring,summer,autumn}',true,16,true,true,true,true,false,true,
'A Provençal estate with iris and lavender gardens, a mas converted for reception use, and a wooded ceremony clearing with distant views of the Sainte-Victoire mountain.',
'Domaine des Iris takes its name from the German iris — bearded iris — that blankets its lower terraces in shades of violet, white, and gold in April and May. The estate sits on the north face of a ridge looking toward Mont Sainte-Victoire, the limestone mountain that Cézanne painted obsessively and that defines the landscape of the Aix-en-Provence hinterland.

The ceremony clearing is a natural platform in the estate''s ancient holm-oak woodland, where the mountain appears framed between the trees. Lavender rows run along the estate''s upper terrace and bloom in July, turning the view from the mas terrace into the most Provençal composition imaginable.',
'{"Iris terraces in bloom (April–May)","Holm-oak ceremony clearing with Sainte-Victoire view","Lavender rows blooming July","16 beds in mas and gîtes","Pet-friendly grounds"}',
'{"provence","aix","iris","lavender","sainte-victoire","cezanne","garden","pet-friendly"}',
'https://images.unsplash.com/photo-1533050487297-09b450131914?w=1200&q=80',
'{"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80"}',
false),

('chateau-du-clos-burgundy','Château du Clos','FR','Burgundy','Dijon','DIJ','Dijon-Bourgogne Airport',20,47.1522,4.8699,'{chateau,vineyard}',50,130,'$$$',28000,46000,'{spring,summer,autumn}',true,18,true,true,false,true,true,false,
'A Burgundy premier cru wine château with a walled garden, a vaulted cave-cellar for intimate receptions, and direct access to the Route des Grands Crus.',
'Château du Clos sits within its own walled clos — the distinctive enclosed vineyard parcel that gives Burgundy''s finest wines their identity. The château is a premier cru estate producing Gevrey-Chambertin and Chambolle-Musigny, and its 17th-century stone buildings have been maintained with the seriousness appropriate to wines of this calibre.

The walled garden provides the ceremony space, the old stone walls radiating warmth long into the evening. Receptions move to the vaulted cave-cellar — perhaps the most intimate reception space in our collection — where 50 guests dine by candlelight surrounded by Burgundy''s most celebrated barrels.',
'{"Premier cru Burgundy wine estate","Walled clos garden for ceremonies","Vaulted cave-cellar for intimate receptions","18 bedrooms in château and annexes","Route des Grands Crus passes the gate"}',
'{"burgundy","wine","premier-cru","walled-garden","cave-cellar","gevrey","intimate"}',
'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
'{"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80"}',
false),

-- ── SPAIN ─────────────────────────────────────────────────────────────────

('finca-del-olivar-andalusia','La Finca del Olivar','ES','Andalusia','Seville','SVQ','Seville Airport',50,37.3891,-5.9845,'{masia,country_estate}',60,150,'$$',11000,19000,'{spring,autumn,winter}',true,18,false,true,true,true,false,true,
'A whitewashed Andalusian finca in the olive groves outside Seville, with a flamenco courtyard, fountain-centred ceremony patio, and 18 beds in the main house and casitas.',
'La Finca del Olivar sits amid three hundred hectares of olive groves on the plain east of Seville, a whitewashed compound of courtyards, fountains, and bougainvillea that feels like the set of a Lorca play brought to life. The finca has been producing olive oil for four generations, and its owners have welcomed weddings with genuine warmth for thirty years.

The ceremony patio is centred on a Moorish fountain, its tiles hand-painted in cobalt and white, the orange trees casting dappled shade over the guests. In the evening, flamenco dancers perform in the courtyard as dinner is served on the long stone terraces. The olive harvest in October-November adds a dimension of place and season that is available at no other venue.',
'{"Moorish fountain patio for ceremonies","Flamenco performance in the courtyard","Three-hundred-hectare olive grove estate","Olive harvest experience (October–November)","18 beds in main house and casitas"}',
'{"andalusia","seville","finca","flamenco","olive-grove","moorish","whitewashed","pet-friendly"}',
'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&q=80',
'{"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"}',
true),

('son-bosc-mallorca','Son Bosc','ES','Mallorca','Palma','PMI','Palma de Mallorca Airport',40,39.5696,2.6502,'{masia,coastal}',50,140,'$$$',25000,42000,'{spring,summer,autumn}',true,20,true,true,true,true,true,false,
'A Mallorcan stone finca with a sea-view terrace, a Mediterranean garden, and 20 beds across the main house and traditional stone cottages in the island''s quiet interior.',
'Son Bosc is a 17th-century Mallorcan finca whose stone terraces step down through almond, olive, and carob orchards toward a sea-view terrace with panoramas across to Ibiza on clear days. The property sits in the island''s quiet interior, away from the coastal development, in a landscape that has barely changed in three centuries.

The ceremony terrace overlooks the Mediterranean, framed by a pair of ancient pines. After the ceremony, guests make their way through the Mediterranean garden — planted with rosemary, lavender, and wild flowers — to the main courtyard for dinner. Twenty bedrooms in the finca and stone cottages make this one of the larger residential properties in our Mallorca selection.',
'{"Sea-view ceremony terrace with Ibiza panorama","17th-century Mallorcan stone architecture","Mediterranean garden of rosemary and lavender","20 beds in finca and stone cottages","Mallorcan sobrasada and ensaïmada on the menu"}',
'{"mallorca","finca","sea-view","mediterranean","almond","olive","island","luxury"}',
'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
'{"https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80"}',
true),

('masia-els-avellaners-catalonia','Masia Els Avellaners','ES','Catalonia','Barcelona','BCN','Barcelona El Prat Airport',90,41.8205,2.1374,'{masia,farmhouse}',50,120,'$$',10000,17000,'{spring,summer,autumn}',true,16,false,true,true,true,false,true,
'A medieval masia in the Montseny foothills with hazel grove gardens, a stone-arched ceremony courtyard, and the natural cork-oak forest of the Collsacabra plateau as backdrop.',
'Masia Els Avellaners — the hazel farmhouse — takes its name from the hazel trees that line the stream below the property, their catkins hanging gold in late winter and their leaves turning copper in October. The masia itself dates to the 13th century and has been painstakingly restored by its current owners, who work as architects and have brought their profession''s rigour to the preservation of every stone arch, vaulted ceiling, and hand-forged iron hinge.

The ceremony courtyard is enclosed by the original masia walls, with a stone arch framing the mountains of the Montseny Natural Park beyond. In summer, bougainvillea covers the south wall in a cascade of pink and orange. The Catalan menu — escalivada, pa amb tomàquet, botifarra from the neighbouring farm — is among the most authentic in our Spanish collection.',
'{"13th-century masia with original stone arches","Montseny Natural Park as ceremony backdrop","Catalan farm-to-table cuisine","16 beds in masia and annexes","Pet-friendly mountain finca"}',
'{"catalonia","masia","montseny","medieval","stone-arch","hazel","mountain","pet-friendly"}',
'https://images.unsplash.com/photo-1533050487297-09b450131914?w=1200&q=80',
'{"https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"}',
false),

('hacienda-los-naranjos-granada','Hacienda los Naranjos','ES','Andalusia','Granada','GRX','Federico García Lorca Granada Airport',30,37.1773,-3.5986,'{country_estate,historic_manor}',60,160,'$$$',22000,38000,'{spring,autumn,winter}',true,20,true,true,true,true,true,false,
'A historic hacienda with Alhambra views, Moorish-inspired gardens of orange trees and fountains, and an events hall with painted tiles and carved plasterwork.',
'Hacienda los Naranjos occupies a hillside below the Sierra Nevada with a direct sightline to the Alhambra''s towers — one of the most dramatic venue settings in southern Europe. The hacienda was built in the 16th century incorporating Moorish architectural elements from the Nasrid period, and its gardens of orange trees, jasmine, and myrtle-edged pools draw directly on the paradise garden tradition of Islamic Spain.

The ceremony takes place in the central courtyard, where the play of light on water and tile creates an atmosphere of extraordinary calm. In the evening, the Alhambra is floodlit and visible from every terrace. Twenty bedrooms in the main hacienda and converted stables ensure the wedding party stays together in this singular setting.',
'{"Direct Alhambra views from ceremony courtyard","Moorish paradise garden design","Orange, jasmine, and myrtle-edged pools","20 bedrooms in main hacienda","Floodlit Alhambra backdrop for evening reception"}',
'{"granada","alhambra","hacienda","moorish","orange-trees","andalusia","luxury","historic"}',
'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
'{"https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"}',
true),

('bodega-san-isidro-rioja','Bodega San Isidro','ES','La Rioja','Bilbao','BIO','Bilbao Airport',90,42.4691,-2.5979,'{vineyard}',50,120,'$$$',24000,40000,'{spring,summer,autumn}',true,16,true,true,true,true,false,false,
'A Rioja wine bodega with ceremony terraces looking over the vine-covered Ebro valley, a barrel-hall for 120 dinner guests, and residential accommodation in the 19th-century estate house.',
'Bodega San Isidro produces Rioja Reserva and Gran Reserva from old-vine Tempranillo planted on both sides of the Ebro valley. The bodega estate house — a honey-coloured 19th-century building of confident provincial grandeur — sits above the vine rows with views south to the Sierra de la Demanda. The barrel hall, with its rows of American and French oak, holds 120 for dinner in an atmosphere that is uniquely Rioja.

The ceremony terrace looks directly over the estate''s vineyards to the river valley below. In autumn, the vines turn from green to amber to deep red over the course of October — the most dramatic possible backdrop for a harvest-season wedding.',
'{"Rioja Reserva and Gran Reserva estate wines","Barrel-hall dinner for up to 120","Ceremony terrace over Ebro valley vineyards","Autumn vine colour (October)","16 bedrooms in 19th-century estate house"}',
'{"rioja","wine","bodega","ebro","tempranillo","barrel-hall","autumn","harvest"}',
'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
'{"https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"}',
false),

('finca-sa-coma-ibiza','Finca Sa Coma','ES','Ibiza','Ibiza','IBZ','Ibiza Airport',25,38.9307,1.4015,'{villa,coastal}',40,100,'$$$$',48000,75000,'{spring,summer,autumn}',true,14,true,true,true,false,true,false,
'A private Ibiza villa above a secluded cove with a salt-pine forest setting, a sea-view ceremony terrace, and a secluded pool terrace for pre-wedding celebrations.',
'Finca Sa Coma occupies a pine-forested hillside above one of Ibiza''s last truly secluded coves. The villa was designed by a Catalan architect who spent two years ensuring that every window frames the right view, every terrace catches the afternoon light, and the natural landscape of salt pines, wild rosemary, and red rock is as important as any designed element.

The ceremony terrace faces west across the cove, the white salt flats of the Ses Salines natural park visible in the distance. The sea turns from turquoise to gold to pink as the afternoon progresses, and by the time dinner is served on the lower terrace, the first stars are visible. This is Ibiza at its quietest and most beautiful — far from the clubs, in full possession of the island''s natural magic.',
'{"Private hillside above a secluded cove","West-facing terrace for ceremony sunsets","Ses Salines natural park panorama","14-bedroom villa exclusivity","Salt-pine forest setting with wild rosemary"}',
'{"ibiza","villa","sea-view","cove","secluded","sunset","luxury","pine-forest"}',
'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
'{"https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"}',
true),

('cortijo-las-flores-ronda','Cortijo Las Flores','ES','Andalusia','Málaga','AGP','Málaga-Costa del Sol Airport',75,36.7213,-5.1668,'{country_estate,farmhouse}',50,120,'$$$',20000,35000,'{spring,autumn,winter}',true,14,false,true,true,true,false,true,
'A cortijo above the clifftop city of Ronda, with views across the Serranía de Ronda, a jasmine-scented courtyard, and 14 beds in whitewashed rooms with terracotta floors.',
'Cortijo Las Flores sits on a hillside within sight of the Puente Nuevo — Ronda''s famous 18th-century bridge spanning the El Tajo gorge — in the mountain country of the Serranía de Ronda. The cortijo has been restored with care: the whitewashed walls, terracotta floors, and carved wooden ceilings have been maintained while adding the comforts expected of a luxury venue.

The ceremony courtyard is jasmine-scented from March through October, the white walls covered in the climbing plant that the owners have trained over decades. Views from the main terrace encompass the gorge, the old town, and the mountains beyond — a distinctly Andalusian composition.',
'{"Views of Ronda''s Puente Nuevo gorge","Jasmine-scented ceremony courtyard","Serranía de Ronda mountain setting","14 whitewashed bedrooms","Pet-friendly mountain cortijo"}',
'{"ronda","andalusia","cortijo","jasmine","gorge","mountain","whitewashed","pet-friendly"}',
'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=80',
'{"https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"}',
false),

('palau-del-vent-girona','Palau del Vent','ES','Catalonia','Girona','GRO','Girona-Costa Brava Airport',30,41.9794,2.8214,'{historic_manor,villa}',40,100,'$$$',26000,42000,'{spring,summer,autumn}',true,16,true,true,true,true,true,false,
'A converted 18th-century Catalan manor with a cypress-lined driveway, a stone-arched loggia, and garden terraces looking toward the Pyrenees.',
'Palau del Vent — the palace of the wind — earned its name from the Tramontane, the dry north wind that sweeps off the Pyrenees across the Empordà plain. The manor was built in 1748 for a wine merchant family and its main facade — austere stone, symmetrical windows, and a central doorway of carved stone — is among the finest examples of Catalan rural architecture.

The cypress-lined driveway is half a kilometre long and provides a ceremony arrival of cinematic drama. The stone loggia at the rear of the house opens onto terraced gardens with distant views of the Pyrenean foothills. The Empordà wine region — Garnacha, Carignan, and Grenache Blanc — supplies the estate''s cellar.',
'{"Half-kilometre cypress-lined arrival driveway","Stone-arched loggia opening to Pyrenean views","18th-century Catalan manor architecture","16 bedrooms in manor and annexes","Empordà wine region cellar"}',
'{"catalonia","girona","manor","emporda","pyrenees","cypress","tramontane","historic"}',
'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80',
'{"https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"}',
false),

('torre-del-mar-basque','Torre del Mar','ES','Basque Country','San Sebastián','EAS','San Sebastián Airport',20,43.3183,-2.0034,'{historic_manor,coastal}',40,100,'$$$$',42000,65000,'{spring,summer,autumn}',true,12,true,true,true,false,true,false,
'A Basque manor tower on the Bay of Biscay with panoramic sea views, a modern events pavilion, and access to San Sebastián''s world-class dining scene.',
'Torre del Mar is a 16th-century Basque fortified tower converted into a residence and events venue on the coastal cliffs above San Sebastián. The original tower has been joined by a sensitively designed glass-and-stone pavilion that faces the Atlantic and holds 100 for dinner with unobstructed views across the Bay of Biscay.

San Sebastián — two kilometres away — has more Michelin stars per capita than anywhere else on earth, and the venue''s in-house chef trained at three of them. The Basque menu — kokotxas, pintxos, grilled turbot, and txakoli wine — represents the apex of Spain''s most serious food culture.',
'{"Bay of Biscay panorama from glass pavilion","In-house chef trained at San Sebastián Michelin restaurants","16th-century Basque tower converted to events venue","12 sea-view suites","5-minute drive from La Concha beach"}',
'{"basque","san-sebastian","coastal","tower","michelin","sea-view","txakoli","luxury"}',
'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
'{"https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"}',
true),

-- ── PORTUGAL ──────────────────────────────────────────────────────────────

('quinta-dos-corvos-douro','Quinta dos Corvos','PT','Douro Valley','Porto','OPO','Porto Francisco Sá Carneiro Airport',120,41.1850,-7.5422,'{vineyard,country_estate}',50,130,'$$$',26000,42000,'{spring,summer,autumn}',true,18,true,true,true,true,true,false,
'A terraced Douro Valley quinta above the river with port wine production, a schist-stone chapel, and some of the most dramatic vine terracing in Europe as a natural backdrop.',
'Quinta dos Corvos perches on the schist hillsides of the Douro Valley, its terraced vineyards cascading to the river in an arrangement that has changed little since the phylloxera replanting of the 1880s. The quinta produces port wine and unfortified Douro DOC wines from Touriga Nacional, Tinta Roriz, and Touriga Franca — varieties whose names are inseparable from this landscape.

The schist-stone chapel, dating to the 18th century, holds 60 for a ceremony. After the vows, guests move to the river-view terrace as the afternoon light turns the opposite terraces from green to gold. Dinner is served in the stone adega, where the estate''s wine is poured from barrels still bearing their vintage chalk marks.',
'{"18th-century schist chapel for 60","Terraced Douro Valley vine panorama","Estate port and Douro DOC wines","18 bedrooms across quinta buildings","Harvest season experience (September–October)"}',
'{"douro","port-wine","quinta","terraced-vineyards","schist","chapel","portugal","harvest"}',
'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80',
'{"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"}',
true),

('herdade-do-sobreiro-alentejo','Herdade do Sobreiro','PT','Alentejo','Évora','EVR','Évora Airport',30,38.5704,-8.0218,'{country_estate,farmhouse}',60,150,'$$',12000,20000,'{spring,autumn,winter}',true,20,true,true,true,true,false,true,
'A cork-oak herdade in the Alentejo plains with a whitewashed ceremony courtyard, a traditional wooden-roofed hall for 150, and the slow, sun-baked rhythm of southern Portugal.',
'Herdade do Sobreiro — the cork-oak estate — sits on the vast Alentejo plains, its whitewashed buildings and cork-oak trees creating a landscape that is quintessentially southern Portuguese. The estate harvests cork every nine years from the same trees that have been stripped since the 17th century, and the distinctive striped bark of freshly harvested oaks marks the seasons as visibly as any vintage.

The ceremony courtyard, framed by cork oaks and whitewashed walls, is an exercise in Alentejo restraint — beautiful because it does not try to be. The traditional hall, its roof supported by local timber beams, holds 150 for dinner. Alentejo cuisine — açorda, migas, roast lamb, and the local Aragonez wines — is among the most distinctive in the Peninsula.',
'{"Cork-oak estate with 17th-century harvest trees","Whitewashed Alentejo ceremony courtyard","Traditional timber-roofed hall for 150","20 beds in main herdade","Alentejo wine and traditional cuisine"}',
'{"alentejo","cork-oak","herdade","whitewashed","traditional","plains","pet-friendly","portuguese"}',
'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
'{"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80"}',
false),

('palacio-de-sintra-hills','Palácio da Bruma','PT','Sintra','Lisbon','LIS','Lisbon Humberto Delgado Airport',35,38.7966,-9.3869,'{historic_manor,villa}',40,100,'$$$$',44000,68000,'{spring,summer,autumn}',true,14,true,true,false,true,true,false,
'A romantic Sintra palace in the wooded hills above the coast, with a Persian-inspired garden, painted tile azulejos throughout, and views of the Atlantic and the Torres Vedras plain.',
'Palácio da Bruma occupies a forested hillside in the UNESCO-listed cultural landscape of Sintra, where the microclimate of the Serra de Sintra sustains a lush garden of camellias, tree ferns, and rare exotics that the palace''s successive owners planted over two centuries. The palace itself, built in the late 19th century for a Brazilian returnee made rich in coffee, combines Gothic, Moorish, and Manueline architectural motifs in a way that could only have happened in Portugal.

The Persian-inspired garden — with its water channels, tiled fountains, and clipped box mazes — is the ceremony setting. The interior rooms, every surface covered in hand-painted azulejos, provide a reception space of unparalleled Lusitanian character. Fourteen suites sleep the wedding party in rooms that feel like the setting of a Pessoa poem.',
'{"UNESCO Sintra cultural landscape location","Persian garden with tiled fountains","Azulejo-covered interiors throughout","14 suites with Atlantic views","40-minute drive from Lisbon"}',
'{"sintra","palace","azulejo","garden","romantic","lisbon","luxury","atlantic","unesco"}',
'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80',
'{"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"}',
true),

('monte-da-ovelha-algarve','Monte da Ovelha','PT','Algarve','Faro','FAO','Faro Airport',40,37.1894,-7.9304,'{farmhouse,country_estate}',50,120,'$$$',22000,36000,'{spring,autumn,winter}',true,16,false,true,true,true,false,true,
'A converted Algarve monte in the tranquil hinterland, with an orange-grove ceremony space, a stone-arched reception terrace, and Mediterranean views from the hilltop pool.',
'Monte da Ovelha sits on a hill in the Algarve''s quiet interior — away from the resort coast, in the carob, almond, and orange country that sustained this region long before tourism arrived. The monte has been in continuous agricultural use since the 16th century, producing almonds, carobs, and olive oil, and its conversion to a wedding venue has been handled with the restraint appropriate to buildings of this antiquity.

The orange grove beside the main building provides a ceremony space of extraordinary fragrance in February (when the blossoms open) and October (when the fruit hangs heavy). The stone-arched reception terrace faces south across the rolling hills toward the sea, just visible on clear days.',
'{"Orange grove ceremony (blossom Feb, fruit Oct)","Stone-arched terrace with sea-distant views","Hilltop pool with Algarve panorama","16 beds in monte and annexes","Pet-friendly working farm setting"}',
'{"algarve","monte","orange-grove","inland","almond","carob","authentic","pet-friendly"}',
'https://images.unsplash.com/photo-1533050487297-09b450131914?w=1200&q=80',
'{"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"}',
false),

('quinta-da-amendoeira-setubal','Quinta da Amendoeira','PT','Setúbal Peninsula','Lisbon','LIS','Lisbon Humberto Delgado Airport',55,38.4953,-8.7653,'{vineyard,farmhouse}',40,100,'$$',11000,18000,'{spring,autumn}',true,12,false,true,true,true,false,true,
'A Palmela DOC wine quinta on the Setúbal Peninsula with almond blossom in February, vine-covered ceremony terraces, and intimate accommodation in the estate farmhouse.',
'Quinta da Amendoeira — the almond tree estate — presents two entirely different faces depending on the season. In February, the almond trees erupt in white blossom before a single leaf has opened, creating a wedding setting of ethereal beauty in the heart of winter. In October, the same trees are laden with green-husked almonds as the Palmela harvest begins, and the quinta''s Castelão and Moscatel wines are poured at the harvest dinner.

The Setúbal Peninsula, less than an hour south of Lisbon, is one of Portugal''s most underrated wine regions — sweet Moscatel de Setúbal and elegant Palmela reds from old-vine Castelão. Twelve farmhouse rooms accommodate the wedding party on this working estate.',
'{"Almond blossom ceremony setting (February)","Palmela DOC and Moscatel de Setúbal wines","October harvest wedding experience","12 farmhouse rooms on working estate","Pet-friendly wine quinta"}',
'{"setubal","almonds","blossom","palmela","wine","farmhouse","autumn","pet-friendly","winter"}',
'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
'{"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"}',
false),

('solar-dos-mouros-minho','Solar dos Mouros','PT','Minho','Porto','OPO','Porto Francisco Sá Carneiro Airport',60,41.8760,-8.3582,'{historic_manor,vineyard}',40,100,'$$',10000,17000,'{spring,summer,autumn}',true,14,true,true,true,false,false,false,
'A Minho solar with vine-covered granite walls, a vinho verde vineyard for ceremony use, and the lush green landscape of northern Portugal''s wine country.',
'Solar dos Mouros is a granite manor house in the Minho, the most verdant corner of Portugal, where the Atlantic rains keep the landscape a shade of green that seems implausible for southern Europe. The solar — a designation for a manor of some standing — dates to the 17th century and its granite walls are draped in the Alvarinho and Loureiro vines from which its vinho verde is produced.

The ceremony space is the vineyard itself, the granite pergola posts supporting the vine canopy that creates a natural green tunnel in summer. The manor''s vinho verde — crisp, slightly sparkling, and bone dry — is poured throughout the celebration as the rivers of the Minho valley shine in the light below.',
'{"Granite vineyard pergola ceremony tunnel","Own-production vinho verde served throughout","17th-century solar in Minho''s lush landscape","14 rooms in solar and annexes","Alvarinho and Loureiro grapes on the vine"}',
'{"minho","vinho-verde","granite","solar","alvarinho","lush","northern-portugal","atlantic"}',
'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80',
'{"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&q=80"}',
false),

-- ── UNITED KINGDOM ────────────────────────────────────────────────────────

('manor-house-cotswolds','The Old Rectory Estate','UK','Cotswolds','Oxford','BHX','Birmingham Airport',80,51.8330,-1.7050,'{historic_manor,country_estate}',60,150,'$$$',22000,38000,'{spring,summer,autumn}',true,18,true,true,true,true,true,true,
'A Georgian rectory estate in the Cotswold Hills with a walled garden, a tithe-barn reception hall, and 18 bedrooms across the main house and converted outbuildings.',
'The Old Rectory Estate sits at the edge of a Cotswold village that appears in the Domesday Book, its honey-stone buildings and yew-hedged churchyard the definitive image of English pastoral life. The rectory itself was built in 1780, its Georgian proportions — sash windows, limestone quoins, and a central Palladian doorcase — providing a backdrop for ceremonies that is quietly, confidently English.

The walled garden, enclosed by two-metre stone walls, provides a sheltered ceremony space even in the unpredictable English summer. The tithe barn — 16th-century oak-frame construction with a stone-flagged floor and original hay loft — holds 150 for dinner and dancing. Eighteen bedrooms in the rectory, stables, and gardener''s cottage sleep the wedding party and immediate family.',
'{"16th-century tithe barn for 150 guests","Walled garden ceremony space","Georgian rectory with Cotswold limestone","18 beds in main house and outbuildings","Pet-friendly estate with paddocks"}',
'{"cotswolds","georgian","walled-garden","tithe-barn","english","pastoral","pet-friendly"}',
'https://images.unsplash.com/photo-1520637836993-5b480e1e60c4?w=1200&q=80',
'{"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80"}',
true),

('highland-castle-scotland','Ardmore Castle','UK','Scottish Highlands','Inverness','INV','Inverness Airport',55,57.3229,-4.9744,'{castle}',40,120,'$$$$',48000,80000,'{spring,summer,autumn}',true,20,true,true,true,true,true,true,
'A Victorian Scottish baronial castle on a Highland loch with a private island ceremony setting, a great hall for 120, and 20 bedrooms in the castle''s towers and turrets.',
'Ardmore Castle rises from the shore of a Highland loch, its Victorian baronial towers reflected in the dark water below. Built in 1872 for a Glasgow industrialist who romanticised the Highlands as thoroughly as Queen Victoria had done, the castle is a fantasy of crow-stepped gables, corbelled turrets, and stained glass — architecture designed to induce awe, and succeeding entirely.

The castle''s private island — accessible by a small wooden boat in summer — provides a ceremony setting of extraordinary seclusion and romance, the castle visible on the far shore. The great hall, with its hammer-beam roof, ancestral portraits, and baronial fireplace, holds 120 for dinner in an atmosphere of Highland splendour.',
'{"Private island ceremony accessible by boat","Victorian baronial great hall for 120","Highland loch reflection of castle","20 bedrooms across towers and turrets","Pet-friendly Highland estate with deer park"}',
'{"scotland","highlands","castle","loch","baronial","island-ceremony","deer-park","pet-friendly","luxury"}',
'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
'{"https://images.unsplash.com/photo-1520637836993-5b480e1e60c4?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"}',
true),

('coastal-estate-cornwall','Tregenna Cove Estate','UK','Cornwall','Newquay','NQY','Cornwall Airport Newquay',40,50.1965,-5.3341,'{coastal,country_estate}',50,130,'$$$',24000,40000,'{spring,summer,autumn}',true,16,true,true,true,true,true,true,
'A Cornish coastal estate with clifftop ceremony terraces, a converted Victorian boathouse for reception use, and direct access to a private cove below.',
'Tregenna Cove Estate occupies a headland on the north Cornish coast, its gardens extending to the cliff edge where the Atlantic crashes against the granite below. The estate includes a Victorian country house, converted coach house, and a boathouse at the base of the cliff — all linked by a path that winds through the estate''s subtropical garden, where the Gulf Stream allows palms, tree ferns, and echiums to flourish.

The ceremony terrace is on the clifftop, the Atlantic as a backdrop and the Cornish coast stretching east and west. After the vows, the converted Victorian boathouse — with its boat-hull ceiling and original stone slipway — serves as the most atmospheric drinks reception space on the coast.',
'{"Clifftop ceremony terrace above the Atlantic","Victorian boathouse with original boat-hull ceiling","Private cove accessible from estate","Subtropical garden with palms and tree ferns","Pet-friendly clifftop estate"}',
'{"cornwall","coastal","clifftop","atlantic","boathouse","subtropical","pet-friendly","english"}',
'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
'{"https://images.unsplash.com/photo-1520637836993-5b480e1e60c4?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"}',
false),

('lake-district-hall-cumbria','Thornthwaite Hall','UK','Lake District','Manchester','MAN','Manchester Airport',180,54.5871,-3.1875,'{historic_manor,country_estate}',50,120,'$$$',26000,42000,'{spring,summer,autumn}',true,16,true,true,true,true,true,true,
'An Elizabethan hall above a Lake District tarn with a private boathouse, a barrel-vaulted long gallery, and the Lakeland mountains as a ceremony backdrop.',
'Thornthwaite Hall sits above a tarn in the quieter western Lakes, its Elizabethan stone front and long gallery recalling a period when this remote landscape was the stronghold of border families who built to last. The hall has been in private ownership since the 16th century and retains an atmosphere of genuine historical weight that more polished venues cannot replicate.

The ceremony takes place on the lawn above the tarn, the reflected peaks of the Cumbrian mountains doubling the scenery. The private boathouse provides drinks by the water after the ceremony. In the evening, the barrel-vaulted long gallery — hung with Elizabethan portraits — becomes the finest dining room in the English Lakes.',
'{"Tarn and Cumbrian mountain ceremony backdrop","Private boathouse for post-ceremony drinks","Barrel-vaulted Elizabethan long gallery","16 bedrooms across hall and cottages","Pet-friendly Lake District estate"}',
'{"lake-district","elizabethan","tarn","mountains","boathouse","gallery","cumbria","pet-friendly"}',
'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
'{"https://images.unsplash.com/photo-1520637836993-5b480e1e60c4?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80","https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80"}',
false),

('garden-estate-kent','Appledore Garden Estate','UK','Kent','London Gatwick','LGW','London Gatwick Airport',75,51.0516,0.7680,'{country_estate}',60,160,'$$',14000,24000,'{spring,summer,autumn}',true,14,false,true,true,true,true,true,
'A Kent garden estate in the High Weald with a walled rose garden, a restored Victorian greenhouse for dinner, and the rolling orchards of the Garden of England as backdrop.',
'Appledore Garden Estate sits in the High Weald of Kent, the landscape that inspired Constable and maintains the most densely hedged, most emphatically English countryside in the south of England. The estate''s Victorian walled garden — four acres enclosed by mellow brick walls — has been restored to its full Victorian complexity, with rose beds, kitchen gardens, and a working herbaceous border that provides all cut flowers for weddings.

The restored Victorian greenhouse — its original cast-iron framework repainted, its new glass gleaming — provides an extraordinary dinner venue in any weather: winter ceremonies bathed in artificial warmth while the frosted orchard glitters beyond the glass; summer dinners with the doors thrown open to the rose garden.',
'{"Four-acre walled Victorian garden","Restored Victorian greenhouse for all-weather dining","High Weald orchards and hedgerows","14 bedrooms in estate house and cottages","Pet-friendly garden estate with orchard walks"}',
'{"kent","garden-of-england","walled-garden","victorian","greenhouse","rose-garden","pet-friendly","orchard"}',
'https://images.unsplash.com/photo-1533050487297-09b450131914?w=1200&q=80',
'{"https://images.unsplash.com/photo-1520637836993-5b480e1e60c4?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"}',
false),

('yorkshire-castle-estate','Hawthorn Castle','UK','Yorkshire','Leeds Bradford','LBA','Leeds Bradford Airport',45,54.0012,-1.5432,'{castle,country_estate}',60,150,'$$$',28000,46000,'{spring,summer,autumn}',true,22,true,true,true,true,true,false,
'A restored medieval castle in the Yorkshire Dales with a private chapel, a great hall for 150, and 22 bedrooms across the castle and converted stable wing.',
'Hawthorn Castle occupies a ridge in the Yorkshire Dales, its 14th-century curtain walls and keep preserved by a careful programme of restoration that has spanned thirty years. The castle is privately owned by a family who have treated the building as a living inheritance rather than a ruin, and the result is a working castle of genuine grandeur that functions as a wedding venue for twelve weekends per year.

The private chapel, consecrated in 1340, retains its original stone font, medieval floor tiles, and carved choir stalls — one of the finest small ecclesiastical spaces in the north of England. The great hall, with its hammer-beam roof and baronial fireplace, holds 150 for dinner. Twenty-two bedrooms in the castle tower and converted stable wing sleep the entire wedding party.',
'{"14th-century private chapel with original medieval interior","Hammer-beam great hall for 150","22 bedrooms in castle tower and stables","Yorkshire Dales national park views","1000-year-old landscape of moor and dale"}',
'{"yorkshire","castle","medieval","chapel","great-hall","dales","english","historic","luxury"}',
'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
'{"https://images.unsplash.com/photo-1520637836993-5b480e1e60c4?w=800&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"}',
true);
