import { SectionShell } from "@/components/shared/section-shell";
import { textLink } from "@/components/ui/text-link";

/* Facts mirror the live DB entries (experience + projects). Update manually if those change. */
export function AboutSection() {
  return (
    <SectionShell id="about" title="About">
      <div className="max-w-[62ch] space-y-5 text-ink-2">
        <p>
          I studied electrical engineering at Universitas Lampung (2021–2025). My thesis was the Python software for
          data transmission and remote access on the U-TEWS tsunami buoy.
        </p>
        <p>
          From 2023 to 2025 I was an IoT engineer at Drone Nirwana Bentala (DRONILA), working on the Buoy and PUMMA
          tsunami early-warning systems and on environmental monitoring stations: sensor data, MQTT and TCP/IP
          transmission, Node-RED flows and Laravel dashboards.
        </p>
        <p>
          Since 2025 I&apos;ve been programming Raspberry Pi and other embedded devices at PT Indomaker Indonesia
          Mandiri. That work includes disaster early-warning systems, an embedded VoIP emergency-call server, AI for
          the Raspbot trainer kit and the PRISCOP print-scan-copy vending machine.
        </p>
        <p>
          In 2024 I took part in IBM SkillsBuild for AI &amp; Cybersecurity (Kampus Merdeka, batch 6), where I built a
          YOLOv8 and TensorFlow model to classify lemon quality.
        </p>
        <p>
          <a href="/cv.pdf" download className={textLink}>
            Download my CV (PDF)
          </a>
        </p>
      </div>
    </SectionShell>
  );
}
