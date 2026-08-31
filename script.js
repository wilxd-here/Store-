/* =========================================
   1. SISTEM KONFIGURASI 
   Silakan ubah data di dalam const config ini
   ========================================= */
const config = {
    profile: {
        name: "[NAMA]",
        username: "@[USERNAME]",
        description: "[DESKRIPSI PROFIL] Seorang kreator dan penyedia layanan Panel Pterodactyl terpercaya.",
        // Gunakan link gambar Anda, atau biarkan placeholder ini
        photo: "https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff&size=200" 
    },

    social: {
        tiktok: "https://tiktok.com/@[USERNAME]",
        instagram: "https://instagram.com/[USERNAME]",
        whatsapp: "https://wa.me/62895384482069",
        youtube: "https://youtube.com/@[USERNAME]"
    },

    panel: [
        {
            name: "2 GB",
            price: "Rp 5.000 / Bulan",
            cpu: "50%",
            storage: "5 GB"
        },
        {
            name: "3 GB",
            price: "Rp 10.000 / Bulan",
            cpu: "100%",
            storage: "10 GB"
        },
        {
            name: "5 GB",
            price: "Rp 15.000 / Bulan",
            cpu: "150%",
            storage: "15 GB"
        },
        {
            name: "8 GB",
            price: "Rp 20.000 / Bulan",
            cpu: "200%",
            storage: "25 GB"
        },
        {
            name: "10 GB",
            price: "Rp 25.000 / Bulan",
            cpu: "250%",
            storage: "30 GB"
        },
        {
            name: "Unlimited",
            price: "Rp 50.000 / Bulan",
            cpu: "Unlimited",
            storage: "Unlimited"
        }
    ]
};

/* =========================================
   2. FUNGSI MERENDER DATA PROFIL
   ========================================= */
function renderProfile() {
    document.getElementById('profile-img').src = config.profile.photo;
    document.getElementById('profile-name').textContent = config.profile.name;
    document.getElementById('profile-username').textContent = config.profile.username;
    document.getElementById('profile-desc').textContent = config.profile.description;
    
    // Setting copyright tahun dinamis untuk footer
    document.getElementById('footer-text').innerHTML = `&copy; 2026 ${config.profile.name}. All rights reserved.`;

    // Render Social Links dengan icon FontAwesome
    const socialContainer = document.getElementById('social-links');
    const socialIcons = {
        tiktok: '<i class="fa-brands fa-tiktok"></i>',
        instagram: '<i class="fa-brands fa-instagram"></i>',
        whatsapp: '<i class="fa-brands fa-whatsapp"></i>',
        youtube: '<i class="fa-brands fa-youtube"></i>'
    };

    for (let platform in config.social) {
        if (config.social[platform]) {
            const link = document.createElement('a');
            link.href = config.social[platform];
            link.target = "_blank";
            link.className = "social-btn";
            link.title = platform;
            link.innerHTML = socialIcons[platform];
            socialContainer.appendChild(link);
        }
    }
}

/* =========================================
   3. FUNGSI MERENDER PANEL PTERODACTYL
   ========================================= */
function renderPanels() {
    const gridContainer = document.getElementById('panel-grid');
    gridContainer.innerHTML = ''; // Bersihkan kontainer

    config.panel.forEach(pkg => {
        const card = document.createElement('div');
        card.className = 'package-card';
        
        card.innerHTML = `
            <div class="pkg-name">${pkg.name}</div>
            <ul class="pkg-specs">
                <li><i class="fa-solid fa-memory"></i> RAM: ${pkg.name}</li>
                <li><i class="fa-solid fa-microchip"></i> CPU: ${pkg.cpu}</li>
                <li><i class="fa-solid fa-hard-drive"></i> Storage: ${pkg.storage}</li>
            </ul>
            <div class="pkg-price">${pkg.price}</div>
            <button class="btn-order" onclick="orderPanel('${pkg.name}')">
                <i class="fa-brands fa-whatsapp"></i> Order
            </button>
        `;
        gridContainer.appendChild(card);
    });
}

/* =========================================
   4. SISTEM ORDER WHATSAPP
   ========================================= */
const whatsappNumber = "62895384482069";

function orderPanel(packageName) {
    const message = `Order Panel ${packageName}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

/* =========================================
   5. SISTEM NAVIGASI (SLIDE TABS)
   ========================================= */
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hilangkan status aktif dari semua tombol dan konten
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Tambahkan status aktif pada tombol yang diklik
            button.classList.add('active');
            
            // Tampilkan konten yang sesuai dengan data-target
            const targetId = button.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

/* =========================================
   6. INISIALISASI WEBSITE SAAT DIMUAT
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    renderProfile();
    renderPanels();
    setupTabs();
});
