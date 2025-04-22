document.addEventListener('DOMContentLoaded', () => {
    const platformButtons = document.querySelectorAll('.platform-button');
    const videoUrlInput = document.getElementById('video-url');
    const downloadButton = document.getElementById('download-button');
    let activePlatform = null;

    platformButtons.forEach(button => {
        button.addEventListener('click', () => {
            platformButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            activePlatform = button.dataset.platform;
            videoUrlInput.placeholder = `${button.textContent.split(' ')[0]} bağlantısını buraya yapıştırın`;
            downloadButton.disabled = !videoUrlInput.value;
        });
    });

    videoUrlInput.addEventListener('input', () => {
        downloadButton.disabled = !videoUrlInput.value || !activePlatform;
    });

    downloadButton.addEventListener('click', () => {
        const videoUrl = videoUrlInput.value;
        if (videoUrl && activePlatform) {
            console.log(`İndirme isteği: Platform - ${activePlatform}, URL - ${videoUrl}`);
            // Burada API isteği gönderme işlevi çağrılacak
            fetchVideoData(activePlatform, videoUrl);
        } else {
            alert('Lütfen bir video bağlantısı yapıştırın ve bir platform seçin.');
        }
    });

    async function fetchVideoData(platform, url) {
        // Bu fonksiyon sunucu tarafına (backend) bir istek gönderecek
        // ve video bilgilerini (indirme bağlantısı vb.) alacak.
        const apiUrl = `/api/download?platform=${platform}&url=${encodeURIComponent(url)}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.downloadUrl) {
                window.location.href = data.downloadUrl; // Doğrudan indir
                alert('İndirme başladı...');
            } else if (data.error) {
                alert(`İndirme hatası: ${data.error}`);
            } else {
                alert('Beklenmeyen bir hata oluştu.');
            }

        } catch (error) {
            console.error('API isteği sırasında bir hata oluştu:', error);
            alert('API isteği sırasında bir hata oluştu.');
        }
    }

    const languageSelector = document.querySelector('.language-selector');
    const languageDropdown = document.querySelector('.language-dropdown');

    languageSelector.addEventListener('mouseenter', () => {
        languageDropdown.style.display = 'block';
    });

    languageSelector.addEventListener('mouseleave', () => {
        languageDropdown.style.display = 'none';
    });

    languageDropdown.querySelectorAll('li').forEach(languageItem => {
        languageItem.addEventListener('click', () => {
            const selectedLanguage = languageItem.textContent;
            console.log(`Dil seçildi: ${selectedLanguage}`);
            alert(`Dil seçildi: ${selectedLanguage}`);
            // Burada dil değiştirme işlemini gerçekleştirecek kod yer alacak (sayfa yenileme veya içerik güncelleme)
        });
    });
});
