<template>
  <div class="about">
    <h3>Proje Gelişimi Hakkında</h3>
<p>Projede, Prisma kullanarak PostgreSQL veritabanı ile etkileşim sağladım. API endpointleri aracılığıyla <code>department</code> tablosundaki tüm kayıtları çekip döndüren fonksiyonlar oluşturdum. Prisma Client’ı modüler yapıda tanımlayarak, veritabanı işlemlerini merkezi ve yeniden kullanılabilir hale getirdim.</p> <p>TypeScript ile <code>Department</code> arayüzü tanımlayarak, departmanların sahip olması gereken alanları (id, name, income, expense, company) tip güvenli şekilde belirledim. Bu sayede veri yapısının tutarlılığını sağladım.</p> <p>Frontend tarafında, Vue 3’ün reaktif özellikleri olan <code>computed</code> ve <code>ref</code> kullanarak departman listesini dinamik biçimde yönettim. Şirket isimlerini benzersiz olarak listeleyen bir <code>computed</code> değer oluşturdum. Toplam gelir ve gider hesaplama fonksiyonları yazdım ve bu değerleri Türkçe yerel ayarlarına uygun biçimde formatladım.</p> <p>UI katmanında Vuetify kütüphanesini entegre ederek, bileşen bazlı ve stil açısından tutarlı bir arayüz oluşturdum. Vuetify’ı Nuxt plugin olarak tanımlayarak, proje genelinde kullanılabilir hale getirdim.</p> <p>Veri çekme işlemleri için Nuxt’un <code>useFetch</code> fonksiyonunu kullanarak verileri serverdan çektim. Yükleme sürecinde <code>pending</code> durumunu takip ederek, kullanıcıya yükleniyor animasyonları gösterdim. Bunu <code>vue3-loading-skeleton</code> paketi ile gerçekleştirdim. Veri geldikten sonra, departman ve şirket bazında grafik bileşenlerini dinamik şekilde render ettim.</p> <p>Grafik görselleştirmelerinde <code>vue-chartjs</code> ve <code>chart.js</code> kütüphanelerini kullandım. Departman bazında gelir ve gider verilerini bar grafik olarak gösteren dinamik bileşenler oluşturdum. Şirket bazında ise, gerekli modülleri (<code>CategoryScale</code>, <code>BarElement</code> vb.) <code>ChartJS.register()</code> ile kayıt edip, grafik konfigürasyonlarını detaylı şekilde yapılandırdım. Böylece şirketlerin toplam gelir ve giderlerini karşılaştırmalı olarak görselleştirebildim.</p> <p>Genel olarak, backend’den frontend’e tam entegre, tip güvenli, reaktif ve modüler bir veri görselleştirme sistemi geliştirdim. Bu sistem kullanıcı dostu, sürdürülebilir ve kolay genişletilebilir yapıya sahiptir.</p> <p>VS Code da Frontend ve backend yapısını tamamıyla bitirdikten sonra bir sonraki adım olan backend yapısını VS da Web API projesine taşındı. Katmanlı mimari ile BusinessLayer, DataAccessLayer ve EntityLayer katmanları eklendi. EntityLayer da Context klasörü oluşturuldu ve içerisinde Department tablosu tanımlandı. DataAccessLayer da Context klasörü içerisinde AppDbContext classı oluşturulup database bilgileri tanımlandı. BusinessLayer katmanında ise öncelikle DepartmentServices classı oluşturuldu ve metodlar tanımlandı. Sonrasında <code>Data Transfer Object (DTO)</code> ile istenilen verilerin gerekli metodlarda işlem görmesi sağlandı. <code>AutoMapper</code> ile farklı veri nesnelerinin otomatik olarak eşleştirilerek dönüştürülmesini ve kopyalanması sağlandı. Frontend tarafında <code>nuxt.config.ts</code> dosyasında apiBase olarak backend’in çalışma URL’ini tanımladım. Artık Prisma yapılarını kaldırdım ve /api altındaki tüm istekleri yakalayan <code>[...].ts</code> dosyasını ekledim. Gelen istekleri config’teki apiBase adresine proxy’leyerek, frontend → Nuxt → backend API şeklinde bir yapı kurdum. Böylece CORS ve güvenlik sorunlarını azalttım; ayrıca API URL’leri de doğrudan frontend tarafında görünmüyor.</p>
</div>
</template>
<style scoped>
.about {
  max-width: 1000px;
  margin: 3rem auto;
  padding: 0 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f9fafd;
  color: #2c3e50;
}
.about h3 {
  color: #27ae60;
  margin-bottom: 0.8rem;
  font-weight: 800;
  font-size: 1.7rem;
  border-left: 6px solid #27ae60;
  padding-left: 10px;
  user-select: none;
}
code{
  background-color: #2c3e504b;
  border-radius: 15px;
  padding: 1px 3px;
}
</style>
