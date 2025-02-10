import mongoose from "mongoose";

async function connect(url: string): Promise<typeof mongoose> {
  return mongoose.connect(url);
}

export { connect };
