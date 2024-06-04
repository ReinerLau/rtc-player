import Url from "url-parse";
export class SrsRtcPlayerAsync {
  private pc: RTCPeerConnection;
  public stream: MediaStream;

  constructor() {
    this.pc = new RTCPeerConnection();
    this.stream = new MediaStream();
    this.pc.ontrack = (event) => {
      this.stream.addTrack(event.track);
    };
  }

  async play(url: string) {
    this.pc.addTransceiver("audio", { direction: "recvonly" });
    this.pc.addTransceiver("video", { direction: "recvonly" });

    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);

    const parsedUrl = new Url(url);
    const api = `http://${parsedUrl.host}/rtc/v1/play/${parsedUrl.query}`;

    try {
      const session: any = await this.getSession(api, url, offer);

      await this.pc.setRemoteDescription(
        new RTCSessionDescription({ type: "answer", sdp: session.sdp })
      );
      return true;
    } catch {
      throw "拉流失败";
    }
  }
  close() {
    this.pc && this.pc.close();
  }

  async getSession(
    api: string,
    streamurl: string,
    offer: RTCSessionDescriptionInit
  ) {
    const body = {
      streamurl,
      sdp: offer.sdp,
    };

    const res = await $fetch(api, {
      method: "post",
      body,
    });

    return res;
  }
}
