/* ==========================================
   Dilara & Aysan
   Luxury Invitation
========================================== */


/* -----------------------------
   ELEMENTLER
------------------------------*/



const locationBtn=document.getElementById("locationBtn");

const hero=document.querySelector(".hero");

const background=document.querySelector(".background");



/* -----------------------------
   MÜZİK
------------------------------*/

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

music.volume = 0.35;

// Başlangıç ikonu
musicBtn.textContent = "🔇";

musicBtn.addEventListener("click", async () => {

    try {

        if (!isPlaying) {

            await music.play();

            isPlaying = true;

            musicBtn.textContent = "🔊";

        } else {

            music.pause();

            isPlaying = false;

            musicBtn.textContent = "🔇";

        }

    } catch (err) {

        console.error(err);

    }

});

// Sayfa açılışında müziği başlatmayı dene
window.addEventListener("load", async () => {
    try {
        await music.play();
        isPlaying = true;
        musicBtn.textContent = "🔊";
    } catch (err) {
        // Tarayıcı otomatik oynatmayı engellerse
        // ilk kullanıcı etkileşiminde başlat
        const startMusic = async () => {
            try {
                await music.play();
                isPlaying = true;
                musicBtn.textContent = "🔊";
            } catch (e) {
                console.log("Müzik başlatılamadı.");
            }
        };

        document.addEventListener("click", startMusic, { once: true });
        document.addEventListener("touchstart", startMusic, { once: true });
    }
});
/* -----------------------------
   KONUM
------------------------------*/

locationBtn.addEventListener("click",()=>{

window.open(

"https://maps.app.goo.gl/JEFht9vkfdjMd98Q7?g_st=ic",

"_blank"

);

});


/* -----------------------------
   PARALLAX
------------------------------*/

hero.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth-.5)*12;

const y=(e.clientY/window.innerHeight-.5)*12;

background.style.transform=

`translate(${x}px,${y}px) scale(1.08)`;

});


hero.addEventListener("mouseleave",()=>{

background.style.transform=

"translate(0px,0px) scale(1.08)";

});


/* -----------------------------
   SCROLL
------------------------------*/

window.addEventListener("scroll",()=>{

const y=window.scrollY;

background.style.transform=

`translateY(${y*.15}px) scale(1.08)`;

});
/* ===========================
   FADE UP
=========================== */

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.35
});

document.querySelectorAll(".fade-up").forEach(el=>{

observer.observe(el);

});
/* ===========================
   MAP BUTTON
=========================== */

const mapButton=document.getElementById("mapButton");

if(mapButton){

mapButton.addEventListener("click",()=>{

window.open(

"https://maps.app.goo.gl/JEFht9vkfdjMd98Q7?g_st=ic",

"_blank"

);

});

}
/* ===========================
   RSVP
=========================== */

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {

    rsvpForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const form = document.getElementById("rsvpForm");
        const success = document.getElementById("successMessage");

        const name = document.getElementById("guestName").value;
        const phone = document.getElementById("guestPhone").value;
        const status = document.getElementById("attendance").value;
        const count = document.getElementById("guestCount").value;
        const message = document.getElementById("guestMessage").value;

        try {

            await fetch("https://script.google.com/macros/s/AKfycbxxt7Wnbg2yZqlU6ORwYZorf8Zf4rd7C66rAccajloz2LvbBEZ8exWmumzV1A7OSA-L/exec", {

                method: "POST",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify({

                    name: name,
                    phone: phone,
                    status: status,
                    count: count,
                    message: message

                })

            });

            if(status === "Katılıyoruz"){

                success.innerHTML = `
                    <div class="success-icon">❤</div>

                    <h3>Teşekkür Ederiz</h3>

                    <p>
                        Yanıtınız bize ulaştı.
                        <br><br>
                        Bu özel günümüzde bizimle olacağınızı bilmek
                        şimdiden bizi çok mutlu etti.
                        <br><br>
                        <strong>22 Ağustos 2026'da görüşmek dileğiyle. ❤️</strong>
                    </p>
                `;

            }else{

                success.innerHTML = `
                    <div class="success-icon">❤</div>

                    <h3>Teşekkür Ederiz</h3>

                    <p>
                        Katılım durumunuzu bizimle paylaştığınız için teşekkür ederiz.
                        <br><br>
                        Sizi aramızda göremeyecek olmak bizi üzecek olsa da,
                        güzel dilekleriniz bizim için çok değerli.
                        <br><br>
                        <strong>En kısa zamanda yeniden görüşmek dileğiyle. 🤍</strong>
                    </p>
                `;

            }

            form.style.display = "none";

            success.classList.add("show");

        } catch (error) {

            console.error(error);

            alert("Gönderim sırasında bir hata oluştu.");

        }

    });

}
/* ==========================================
   RSVP BUTTONS
========================================== */

const attendanceButtons = document.querySelectorAll(".attendance-btn");
const attendanceInput = document.getElementById("attendance");
const guestCountField = document.getElementById("guestCountField");

attendanceButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        attendanceButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        const status = button.dataset.status;

        attendanceInput.value = status;

        if(status==="Katılıyoruz"){

            guestCountField.classList.remove("hidden");

        }else{

            guestCountField.classList.add("hidden");

        }

    });

});
/* ==========================================
   COUNTDOWN
========================================== */

const targetDate = new Date("2026-08-22T19:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = targetDate - now;

    if(distance <= 0){

        document.getElementById("days").innerText="00";
        document.getElementById("hours").innerText="00";
        document.getElementById("minutes").innerText="00";
        document.getElementById("seconds").innerText="00";

        return;

    }

    const days=Math.floor(distance/(1000*60*60*24));

    const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes=Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds=Math.floor((distance%(1000*60))/1000);

    document.getElementById("days").innerText=days;
    document.getElementById("hours").innerText=hours;
    document.getElementById("minutes").innerText=minutes;
    document.getElementById("seconds").innerText=seconds;

}
/* ==========================================
GUEST COUNT BUTTONS
========================================== */

const guestButtons = document.querySelectorAll(".guest-btn");
const guestCountInput = document.getElementById("guestCount");

/* URL'deki max değerini oku */
const urlParams = new URLSearchParams(window.location.search);
const maxGuests = urlParams.get("max");

/* Sadece 1,2 veya 4 kişilik davetiyeye izin ver */
if (maxGuests === 1 || maxGuests === 2 || maxGuests === 4) {

    guestButtons.forEach(button => {

        const count = parseInt(button.dataset.count);

        if(count > parseInt(maxGuests)){

            button.style.display = "none";

        }

    });

}

/* Butonların çalışma mantığı */
guestButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        guestButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        guestCountInput.value = button.dataset.count;

    });

});
/* ==========================================
   AŞAĞI KAYDIR BUTONLARI
========================================== */

document.querySelectorAll(".scroll-next").forEach(button => {

    button.addEventListener("click", () => {

        const currentSection = button.closest("section, header");

        if (!currentSection) return;

        let nextSection = currentSection.nextElementSibling;

        while (
            nextSection &&
            !nextSection.matches("section, header, footer")
        ) {
            nextSection = nextSection.nextElementSibling;
        }

        if (nextSection) {

            nextSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});
/* ==========================================
   DAVETİYE KİŞİ SAYISI SINIRI
========================================== */

const guestCountSelect = document.getElementById("guestCount");

if (guestCountSelect) {

    const params = new URLSearchParams(window.location.search);

    const maxGuests = parseInt(params.get("max"));

    if (maxGuests === 1 || maxGuests === 2 || maxGuests === 4) {

        guestCountSelect.querySelectorAll("option").forEach(option => {

            const count = parseInt(option.value);

            if (count > maxGuests) {
                option.remove();
            }

        });

    }

}
updateCountdown();

setInterval(updateCountdown,1000);
