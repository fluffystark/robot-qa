import http from "../http-common";
import { RobotData } from "../types/robot.type"

class RobotDataService {
  getAll() {
    return http.get<Array<RobotData>>("/robots");
  }
  extinguish(id: string) {
    return http.post<boolean>(`/robots/${id}/extinguish`);
  }
  recycle(data: [string]) {
    return http.post<boolean>(`/robots/recycle`, data);
  }
  createShipment(data: [string]) {
    return http.put<any>(`/shipments/create`, data);
  }
}
export default new RobotDataService();