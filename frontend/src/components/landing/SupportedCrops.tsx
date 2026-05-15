"use client";

import { motion } from "framer-motion";
import { TreeDeciduous, Cherry, Grape, Circle, Leaf } from "lucide-react";

const crops = [
  { name: "Apple", diseases: 3, icon: TreeDeciduous },
  { name: "Tomato", diseases: 9, icon: Circle },
  { name: "Grape", diseases: 3, icon: Grape },
  { name: "Corn", diseases: 3, icon: Leaf },
  { name: "Potato", diseases: 2, icon: Leaf },
  { name: "Cherry", diseases: 1, icon: Cherry },
  { name: "Peach", diseases: 1, icon: TreeDeciduous },
  { name: "Pepper", diseases: 1, icon: Leaf },
  { name: "Strawberry", diseases: 1, icon: Cherry },
  { name: "Orange", diseases: 1, icon: Circle },
  { name: "Soybean", diseases: 0, icon: Leaf },
  { name: "Squash", diseases: 1, icon: Leaf },
  { name: "Blueberry", diseases: 0, icon: Cherry },
  { name: "Raspberry", diseases: 0, icon: Cherry },
];

export function SupportedCrops() {
  return (
    <section className="py-20" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
            Coverage
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-outfit)" }}>
            14 Crop Species Supported
          </h2>
          <p className="mt-3 text-base" style={{ color: "var(--text-muted)" }}>
            From orchards to vegetable gardens — our AI has you covered.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {crops.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group flex flex-col items-center gap-2 rounded-2xl p-4 text-center transition-all hover:shadow-md cursor-default"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                style={{ background: "var(--bg-alt)", color: "var(--primary)" }}
              >
                <c.icon size={18} />
              </div>
              <span className="text-sm font-medium">{c.name}</span>
              <span className="text-xs" style={{ color: "var(--text-light)" }}>
                {c.diseases > 0 ? `${c.diseases} disease${c.diseases > 1 ? "s" : ""}` : "Health check"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
