import React, { useEffect, useState } from "react";
import styles from "./Invitation.module.css";

function Countdown() {
  const [time, setTime] = useState({ d: 0, h: "00", m: "00", s: "00" });

  useEffect(() => {
    const target = new Date("2025-12-20T11:00:00-06:00");
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, target.getTime() - now.getTime());
      const s = Math.floor(diff / 1000);
      const d = Math.floor(s / 86400);
      const h = Math.floor((s % 86400) / 3600);
      const m = Math.floor((s % 3600) / 60);
      const ss = s % 60;
      setTime({
        d,
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(ss).padStart(2, "0"),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.countdown}>
      <div className={styles.cdBox}>
        <div className={styles.num}>{time.d}</div>
        <div className={styles.lab}>Días</div>
      </div>
      <div className={styles.cdBox}>
        <div className={styles.num}>{time.h}</div>
        <div className={styles.lab}>Horas</div>
      </div>
      <div className={styles.cdBox}>
        <div className={styles.num}>{time.m}</div>
        <div className={styles.lab}>Min</div>
      </div>
      <div className={styles.cdBox}>
        <div className={styles.num}>{time.s}</div>
        <div className={styles.lab}>Seg</div>
      </div>
    </div>
  );
}

const Invitation: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.muted = false;
        setIsMuted(false);
        audioRef.current.play().catch(() => {
          // El navegador bloqueó la reproducción automática
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Intentar reproducir automáticamente al cargar la página (muted)
    const attemptAutoplay = () => {
      if (audioRef.current) {
        audioRef.current.muted = true;
        setIsMuted(true);
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            // Intentar quitar el mute tras la primera interacción
            const unmuteOnInteraction = () => {
              if (audioRef.current) {
                audioRef.current.muted = false;
                setIsMuted(false);
              }
            };
            document.addEventListener("click", unmuteOnInteraction, {
              once: true,
            });
            document.addEventListener("touchstart", unmuteOnInteraction, {
              once: true,
            });
          })
          .catch(() => {
            // Si falla, intentar con la primera interacción del usuario
            const playOnInteraction = () => {
              if (audioRef.current) {
                audioRef.current.muted = false;
                setIsMuted(false);
                audioRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                  })
                  .catch(() => {});
              }
            };
            document.addEventListener("click", playOnInteraction, {
              once: true,
            });
            document.addEventListener("touchstart", playOnInteraction, {
              once: true,
            });
          });
      }
    };
    attemptAutoplay();
  }, []);

  const handleWhatsAppClick = (contact: "rosa" | "quevi") => {
    const phone = contact === "rosa" ? "50236371796" : "50233837847";
    const message = encodeURIComponent(
      `Hola, quiero confirmar mi asistencia a la boda de Rosa y Quevi el 20 de diciembre. Gracias.`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    setShowModal(false);
  };

  return (
    <div className={styles.invitation}>
      <audio
        ref={audioRef}
        src="/Princess Leia's Theme.mp3"
        loop
        preload="auto"
        muted={isMuted}
      />

      <button
        className={styles.musicToggle}
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <header className={styles.hero}>
        <div className={styles.heroMedia} />
        <div className={styles.heroOverlay} />
        <div className={styles.container}>
          <div className={styles.heroWrap}>
            <div className={styles.eyebrow}>¡Nos casamos!</div>
            <h1 className={styles.couple}>Rosa & Quevi</h1>
            <p className={styles.date}>
              Sábado, 20 de Diciembre de 2025 · Parroquia Jesús camina con
              nosotros (NIPALAQUIN) Ciudad Quetzal.
            </p>
            <Countdown />
            <div className={styles.ctaRow}>
              <button
                className={styles.btn}
                type="button"
                onClick={() => setShowModal(true)}
              >
                Confirmar asistencia
              </button>
              <a className={styles.btnOutline} href="#detalles">
                Ver detalles
              </a>
              <a
                className={styles.btnOutline}
                href="https://maps.app.goo.gl/EDw2u7cqJYKcgoDQ9"
                target="_blank"
                rel="noopener"
              >
                Cómo llegar
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="detalles" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Detalles del día</h2>
            <p className={styles.sectionDesc}>
              ¡Estamos muy felices de compartir este gran paso contigo! Ven a
              celebrar el amor, la alegría y los momentos inolvidables que nos
              esperan juntos. Aquí tienes todos los detalles para que vivas con
              nosotros un día lleno de magia y mucho cariño.
            </p>

            <div className={styles.grid}>
              <article className={styles.card}>
                <h3>Ceremonia</h3>
                <p>
                  <strong>Hora:</strong> 11:00 AM
                </p>
                <p>
                  <strong>Lugar:</strong> Parroquia Jesús camina con nosotros
                  (NIPALAQUIN) Ciudad Quetzal.
                </p>
                <p className={styles.mt2}>
                  <a
                    className={styles.btnOutline}
                    href="https://maps.app.goo.gl/EDw2u7cqJYKcgoDQ9"
                    target="_blank"
                    rel="noopener"
                  >
                    Abrir mapa
                  </a>
                </p>
              </article>

              <article className={styles.card}>
                <h3>Recepción Y Almuerzo</h3>
                <p>
                  <strong>Hora:</strong> 13:00 PM
                </p>
                <p>
                  <strong>Lugar:</strong>Restaurante y eventos San Jorge
                </p>
                <p className={styles.mt2}>
                  <a
                    className={styles.btnOutline}
                    href="https://maps.app.goo.gl/PeUdkGxJMkbUwJ529"
                    target="_blank"
                    rel="noopener"
                  >
                    Abrir mapa
                  </a>
                </p>
              </article>

              <article className={styles.card}>
                <h3>Código de vestimenta</h3>
                <div className={styles.tags}>
                  <span className={styles.tag}>Formal</span>
                  <span className={styles.tag}>
                    Paleta: Evitar colores blanco
                  </span>
                </div>
              </article>
            </div>

            <div className={`${styles.card} ${styles.mt6}`}>
              <h3>Itinerario</h3>
              <div className={styles.timeline}>
                <div className={styles.tItem}>
                  <div className={styles.tTime}>09:00 am</div>
                  <div className={styles.tText}>
                    Salida de transporte de Villa Nueva hacia la parroquia
                  </div>
                </div>
                <div className={styles.tItem}>
                  <div className={styles.tTime}>11:00 am</div>
                  <div className={styles.tText}>Ceremonia</div>
                </div>
                <div className={styles.tItem}>
                  <div className={styles.tTime}>12:00 am</div>
                  <div className={styles.tText}>
                    Salida de transporte hacia el restaurante
                  </div>
                </div>

                <div className={styles.tItem}>
                  <div className={styles.tTime}>13:00 pm</div>
                  <div className={styles.tText}>Recepcion y almuerzo</div>
                </div>
                <div className={styles.tItem}>
                  <div className={styles.tTime}>06:00 pm</div>
                  <div className={styles.tText}>
                    Regreso de transporte de restaurante a parroquia
                  </div>
                </div>
                <div className={styles.tItem}>
                  <div className={styles.tTime}>07:00 pm</div>
                  <div className={styles.tText}>
                    Salida de transporte de la parroquia hacia Villa Nueva
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.grid} ${styles.mt6}`}>
              {/* <article className={styles.card}>
                <h3>Lista de regalos</h3>
                <p>
                  Tu presencia es nuestro mejor regalo. Si deseas obsequiarnos
                  algo, hemos preparado opciones:
                </p>
                <ul>
                  <li>
                    <a
                      href="https://www.amazon.com/registries"
                      target="_blank"
                      rel="noopener"
                    >
                      Mesa de regalos en línea
                    </a>
                  </li>
                  <li>Cuenta bancaria: Banco Industrial · 123-456789-0</li>
                </ul>
              </article> */}

              <article className={styles.card}>
                <h3>Confirmación</h3>
                <p>
                  Por favor confirma antes del <strong>30/11/2025</strong>.
                </p>
                <p className={styles.mt2}>
                  <button
                    className={styles.btnWhatsApp}
                    onClick={() => setShowModal(true)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Confirmar por WhatsApp
                  </button>
                </p>
              </article>

              <article className={styles.card}>
                <h3>Servicio de transporte</h3>
                <ul>
                  <li>
                    <strong>9:00 AM</strong> - Transporte de Villa Nueva hacia
                    parroquia
                  </li>
                  <li>
                    <strong>12:00 PM</strong> - Transporte sale de la parroquia
                    hacia el restaurante
                  </li>
                  <li>
                    <strong>6:00 PM</strong> - Salida de transporte del
                    restaurante hacia la parroquia
                  </li>
                  <li>
                    <strong>7:00 PM</strong> - Salida de parroquia hacia Villa
                    Nueva
                  </li>
                </ul>
              </article>

              <article className={styles.card}>
                <h3>Información útil</h3>
                <p>
                  Estacionamiento disponible en el lugar. Sugerimos llegar 20
                  minutos antes. Niños bienvenidos.
                </p>
              </article>
            </div>

            <div className={styles.mt6}>
              <h2 className={styles.sectionTitle}>Nuestros Momentos</h2>
              <p className={styles.sectionDesc}>
                Un vistazo a nuestra historia
              </p>

              <div className={styles.gallery}>
                <div className={styles.galleryItem}>
                  <img src="/image.jpeg" alt="Rosa y Quevi" loading="lazy" />
                </div>
                <div className={styles.galleryItem}>
                  <img
                    src="/image (2).jpeg"
                    alt="Rosa y Quevi"
                    loading="lazy"
                  />
                </div>
                <div className={styles.galleryItem}>
                  <img
                    src="/image (3).jpeg"
                    alt="Rosa y Quevi"
                    loading="lazy"
                  />
                </div>
                <div className={styles.galleryItem}>
                  <img
                    src="/image (4).jpeg"
                    alt="Rosa y Quevi"
                    loading="lazy"
                  />
                </div>
                <div className={styles.galleryItem}>
                  <img
                    src="/image (5).jpeg"
                    alt="Rosa y Quevi"
                    loading="lazy"
                  />
                </div>
                <div className={styles.galleryItem}>
                  <img
                    src="/image (6).jpeg"
                    alt="Rosa y Quevi"
                    loading="lazy"
                  />
                </div>
                <div className={styles.galleryItem}>
                  <img
                    src="/image (7).jpeg"
                    alt="Rosa y Quevi"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.center}>
            <div className={styles.made}>Con cariño, Rosa & Quevi.</div>
            <div className={styles.mt3}>
              © 2025. Sitio de invitación para de uso personal.
            </div>
          </div>
        </div>
      </footer>

      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h3 className={styles.modalTitle}>¿Con quién deseas confirmar?</h3>
            <p className={styles.modalDesc}>
              Elige a quién enviar tu confirmación por WhatsApp
            </p>
            <div className={styles.modalButtons}>
              <button
                className={styles.modalBtn}
                onClick={() => handleWhatsAppClick("rosa")}
              >
                <div className={styles.modalBtnIcon}>💐</div>
                <div className={styles.modalBtnText}>
                  <strong>Rosa</strong>
                  <span>La novia</span>
                </div>
              </button>
              <button
                className={styles.modalBtn}
                onClick={() => handleWhatsAppClick("quevi")}
              >
                <div className={styles.modalBtnIcon}>🤵</div>
                <div className={styles.modalBtnText}>
                  <strong>Quevi</strong>
                  <span>El novio</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invitation;
