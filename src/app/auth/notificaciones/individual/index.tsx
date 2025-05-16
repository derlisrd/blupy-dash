import { NotificationIndividualProvider } from "./provider";
import MainNotificaciontIndividual from "./main";
import EnviarPushModal from "./enviar.push.modal";
import EnviarWaModal from "./enviar.wa.modal";

function Individual() {
  return (
    <NotificationIndividualProvider>
      <EnviarWaModal />
      <EnviarPushModal />
      <MainNotificaciontIndividual />
    </NotificationIndividualProvider>
  );
}

export default Individual;
