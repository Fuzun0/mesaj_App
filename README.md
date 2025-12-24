# Messaging App

**Öğrenci:** Hüseyin Furkan Uzun  
**Öğrenci No:** 20235070309

React Native ile geliştirilmiş tam özellikli bir mesajlaşma uygulaması.

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npm start

# Android için
npm run android

# iOS için
npm run ios
```

## Özellikler

### 📱 Temel Özellikler
- ✅ Ağ durumu takibi (Status komponenti)
- ✅ Mesaj listesi görüntüleme (inverted FlatList)
- ✅ Metin, görsel ve konum mesajları
- ✅ Mesaj silme ve tam ekran görüntüleme
- ✅ Klavye yönetimi ve özel giriş metodu

### 🎨 Görsel Özellikler
- ✅ Kamera ile fotoğraf çekme
- ✅ Galeriden fotoğraf seçme
- ✅ Görsel grid seçici (son 20 fotoğraf)
- ✅ Harita üzerinde konum paylaşma

### 🔧 Teknik Özellikler
- ✅ React Native 0.81.5
- ✅ Expo SDK 54
- ✅ NetInfo ile ağ durumu takibi
- ✅ LayoutAnimation ile yumuşak geçişler
- ✅ Android geri tuşu yönetimi
- ✅ iOS ve Android uyumlu

## Proje Yapısı

```
Mesaj_App/
├── App.js                           # Ana uygulama dosyası
├── components/
│   ├── Status.js                    # Ağ durumu göstergesi
│   ├── MessageList.js               # Mesaj listesi
│   ├── Toolbar.js                   # Araç çubuğu (kamera, galeri, konum)
│   ├── InputMethodEditor.js         # Mesaj girişi
│   ├── MessagingContainer.js        # Klavye ve özel giriş yönetimi
│   └── ImageGrid.js                 # Galeri görsel grid seçici
├── utils/
│   ├── MessageUtils.js              # Mesaj yardımcı fonksiyonları
│   └── constants.js                 # Sabitler
├── package.json
├── app.json
└── babel.config.js
```

## Bileşen Açıklamaları

### Status
NetInfo kullanarak cihazın ağ bağlantısını takip eder. İnternet bağlantısı olmadığında ekranın üst kısmında kırmızı bir uyarı mesajı gösterir.

### MessageList
- Farklı mesaj tiplerini (text, image, location) render eder
- FlatList inverted mode kullanır
- Mesajlara tıklanabilir ve silinebilir

### Toolbar
- Kamera ile fotoğraf çekme
- Galeriden fotoğraf seçme
- Görsel grid seçici toggle
- GPS ile konum paylaşma

### MessagingContainer
- Klavye event'lerini dinler
- LayoutAnimation ile yumuşak geçişler
- Android geri tuşu yönetimi
- Özel giriş metodu (ImageGrid) desteği

### ImageGrid
- MediaLibrary ile son 20 fotoğrafı gösterir
- 4 sütunlu responsive grid
- İzin yönetimi

## Teknolojiler

- React Native 0.81.5
- Expo SDK 54
- expo-location (Konum servisleri)
- expo-image-picker (Kamera ve galeri)
- expo-media-library (Fotoğraf listesi)
- react-native-maps (Harita gösterimi)
- @react-native-community/netinfo (Ağ durumu)
- react-native-get-random-values (UUID desteği)

## Geliştirici

**Hüseyin Furkan Uzun**  
Öğrenci No: 20235070309
