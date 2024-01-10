import "./App.scss";
import { Calender } from "./components/calendar/calendar";
import { CalendarContextProvider } from "./context/calendar-context";
import { ModalContextProvider } from "./context/modal-context";
import { MainLayout } from "./layout/main-layout";

function App() {
    return (
        <CalendarContextProvider>
            <ModalContextProvider>
                <MainLayout>
                    <Calender />
                </MainLayout>
            </ModalContextProvider>
        </CalendarContextProvider>
    );
}

export default App;
