-----------------------------------------------------
-- Schema full-stack-szumilasapp
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `full-stack-szumilasapp`;

CREATE SCHEMA `full-stack-szumilasapp`;
USE `full-stack-szumilasapp`;

-- -----------------------------------------------------
-- Table `full-stack-szumilasapp`.`product_category`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `full-stack-szumilasapp`.`product_category`(
  id BIGINT NOT NULL primary key auto_increment,
  category_name VARCHAR(255) NULL DEFAULT NULL
  );

CREATE TABLE IF NOT EXISTS `full-stack-szumilasapp`.`product` (
  id BIGINT NOT NULL primary key auto_increment,
  sku VARCHAR(255) DEFAULT NULL,
  name VARCHAR(255) DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL,
  unit_price DECIMAL(13,2) DEFAULT NULL,
  image_url VARCHAR(255) DEFAULT NULL,
  active BIT DEFAULT 1,
  units_in_stock INT DEFAULT NULL,
  date_created DATETIME(6) DEFAULT NULL,
  last_updated DATETIME(6) DEFAULT NULL,
  category_id BIGINT NOT NULL
  );
alter table product add foreign key (category_id) references product_category (id);

INSERT INTO product_category(category_name) VALUES ('Kaski');
INSERT INTO product_category(category_name) VALUES ('Uprzęże');
INSERT INTO product_category(category_name) VALUES ('Przyrządy asekuracyjne');
INSERT INTO product_category(category_name) VALUES ('Liny');

INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id, date_created) VALUES ('HELMET-100', 'Kask SALEVA', 'Saleva Pura to kask wspinaczkowy do wszechstronnego zastosowania.\n\nProsty w obsłudze system regulacji pozwala na dopasowanie kasku przy pomocy tylko jednej dłoni. Dodatkowy komfort użytkowania zapewnia odpinana wyściółka, która może być prana.', 'assets/images/products/helmets/100.png', 1, 100, 299.99, 1, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id, date_created) VALUES ('HELMET-101', 'Kask BLACK DIAMOND', 'Najnowsza, zaprojektowana od nowa wersja kasku Black Diamond .\n\nUltralekki kask posiada dwuczęściową konstrukcję. Nowoczesny sznurkowy system nośny zapewnia łatwe i szybkie dopasowanie jednocześnie znacząco obniża wagę kasku.', 'assets/images/products/helmets/101.png', 1, 100, 599.99, 1, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id, date_created) VALUES ('HELMET-102', 'Kask LA SPORTIVA', 'Kask to skialpinistyczny model posiadający wszelkie niezbędne certyfikaty wymagane do wzięcia udziału w zawodach.\n\nDzięki niezwykle lekkiej budowie sprawdzi się również podczas klasycznych skitourowych wycieczek.', 'assets/images/products/helmets/102.png', 1, 100, 549.99, 1, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id, date_created) VALUES ('HELMET-103', 'Kask PETZL ', 'Petzl jest lekkim, damskim kaskiem przeznaczonym do wspinaczki, alpinizmu i skituringu.\n\nPrzylegającą forma kasku zapewnia zwiększoną ochronę całej głowy.', 'assets/images/products/helmets/103.png', 1, 100, 399.99, 1, NOW());


INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id, date_created) VALUES ('HARNESS-100', 'Uprząż wspinaczkowa PETZL', 'Uprząż Petzl Tour jest przeznaczona do alpinizmu i skialpinizmu., można ją łatwo założyć mając narty czy raki na nogach. Zastosowane materiały zapewniają dużą trwałość, a jednocześnie niewielki ciężar i wielkość.', 'assets/images/products/harnesses/100.png', 1, 100, 179.99, 2, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id, date_created) VALUES ('HARNESS-101', 'Uprząż wspinaczkowa BLACK DIAMOND', 'Uniwersalna i bardzo wygodna. Uprząż wyposażona jest w szybką klamrę Speed Adjust pozwalającą na błyskawiczną i wygodną regulację uprzęży w pasie. Regulowane uda pozwalają na dobre dopasowanie w zarówno w warunkach letnich jaki i zimowych.', 'assets/images/products/harnesses/101.png', 1, 100, 169.99, 2, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id, date_created) VALUES ('HARNESS-102', 'Uprząż wspinaczkowa SALEVA', 'Wytrzymała i bardzo wygodna uniwersalna uprząż wspinaczkowa Saleva. Hybrydowa konstrukcja łączy elastyczny, ruchomy pas biodrowy z zszytą, wygodną i oddychającą pianką dystansującą 3D.', 'assets/images/products/harnesses/102.png', 1, 100, 329.99, 2, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id, date_created) VALUES ('HARNESS-103', 'Uprząż wspinaczkowa WILD COUNTRY', 'Całkowicie nowa uprząż Wild Country zaprojektowana do długich, górskich wspinaczek; idealna na drogi typu "big wall". Oferuje doskonałą wszechstronność, komfort, wsparcie i wentylację, przy zachowaniu rozsądnej wagi.', 'assets/images/products/harnesses/103.png', 1, 100, 469.99, 2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('BELAYDEVICE-100', 'Przyrząd asekuracyjny EDELRID', 'Edelrid to najbardziej wszechstronne urządzenie asekuracyjne. Wspomaganą funkcję hamowania, która wspiera siłę hamowania, można włączyć lub wyłączyć za pomocą inteligentnego mechanizmu.', 'assets/images/products/belaydevice/100.png', 1, 100, 219.99, 3, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('BELAYDEVICE-101', 'Przyrząd asekuracyjny CAMP', 'Przyrząd asekuracyjny CAMP Matik na nowo ustala definicję bezpiecznej asekuracji. Dzięki automatycznemu systemowi Anti-Panic jest on w stanie samoczynnie zablokować linę w przypadku utraty kontroli.', 'assets/images/products/belaydevice/101.png', 1, 100, 519.99, 3, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('BELAYDEVICE-102', 'Przyrząd asekuracyjny BLACK DIAMOND', 'Black Diamond został stworzony z myślą o górskich wspinaczach. Ten ważący zaledwie 73 gramy przyrząd jest zoptymalizowany dla lin o średnicy od 8,1 do 8,5 milimetra, ale pracuje z linami od 6,9 do 9 mm.', 'assets/images/products/belaydevice/102.png', 1, 100, 139.99, 3, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('BELAYDEVICE-103', 'Przyrząd asekuracyjny PETZL', 'Najnowsza odsłona przyrządu asekuracyjno-zjazdowego Petzl Grigri. Przyrząd asekuracyjny ze wspomaganym hamowaniem przeznaczonym dla doświadczonych użytkowników.', 'assets/images/products/belaydevice/103.png', 1, 100, 419.99, 3, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('ROPE-100', 'Lina STERLING', 'Sterling to uniwersalna propozycja zarówno do wspinaczki na halowej jak i prowadzenia tradowych dróg. Niezależnie czy wspinasz się tradowo czy prowadzisz swoją życiówkę, lina Quest o średnicy 9.6 mm i zwartym oplocie.', 'assets/images/products/ropes/100.png', 1, 100, 799.99, 4, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('ROPE-101', 'Lina EDELRID', 'Lekka lina sportowa Edelrid Boa o bardzo przyjaznej średnicy 9,8 mm. Świetna jakość dzięki idealnemu zrównoważeniu wytrzymałości rdzenia i oplotu o odpowiedniej grubości i splotowi.', 'assets/images/products/ropes/101.png', 1, 100, 699.99, 4, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('ROPE-102', 'Lina SALEVA', 'Niezwykle lekka lina pdwójna Salewa Double 7,9 mm z impregnacją Dry Tech, doskonała do wspinaczki górskiej oraz zaawansowanej, wymagającej technicznie turystyki górskiej i lodowcowej. Średnica 7,9 mm oraz mocny oplot.', 'assets/images/products/ropes/102.png', 1, 100, 599.99, 4, NOW());
INSERT INTO product (sku, name, description, image_url, active, units_in_stock, unit_price, category_id,date_created) VALUES ('ROPE-103', 'Lina FIRE SPORT', 'Lina do wspinaczki sportowej Fixe Sport 9.8 mm polecana w szczególności początkującym wspinaczom. Wytrzymała lina wspinaczkowa o średnicy 9.8 mm z oplotem zaplecionym z 48 włókien polecana jest do wspinaczki sportowej i wspinaczki na sztucznej ściance.', 'assets/images/products/ropes/103.png', 1, 100, 599.99, 4, NOW());