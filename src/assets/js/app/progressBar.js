export default function progressBar(start = 0, end = 90) {
  return {
    progress: start,
    progressInterval: null,
    end: end, // Define the end value here
    init() {
      this.$el.addEventListener("start-progress", () => {
        this.startProgress();
      });
    },
    startProgress() {
      // Clear any existing interval
      if (this.progressInterval) clearInterval(this.progressInterval);

      // Start progress increment
      this.progressInterval = setInterval(() => {
        this.progress += 1;
        if (this.progress >= this.end) {
          // Use this.end
          clearInterval(this.progressInterval);
        }
      }, 50); // 30ms interval for smoother progress
    },
  };
}
