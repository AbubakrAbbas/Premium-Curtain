import { motion } from "framer-motion";
import { installations } from "../data/siteData";
import BeforeAfter from "./BeforeAfter";
import Reveal from "./Reveal";

/** Before & after installation gallery — drag the handle on each photo. */
export default function Installations() {
  return (
    <section
      id="installations"
      className="section bg-sand/40"
      aria-label="Before and after installations"
    >
      <div className="wrap">
        <Reveal variant="blur" className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Recent installations</p>
          <h2 className="h2 mt-4">Before &amp; after.</h2>
          <p className="lead mt-5">
            Drag the handle to see the transformation. Every project is
            measured, made and installed by our own team.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {installations.map((job, i) => (
            <motion.figure
              key={job.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <BeforeAfter
                before={job.before}
                after={job.after}
                alt={job.title}
                filterBefore={job.filterBefore}
              />
              <figcaption className="mt-4">
                <h3 className="text-xl">{job.title}</h3>
                <p className="mt-1 text-sm text-muted">{job.note}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
