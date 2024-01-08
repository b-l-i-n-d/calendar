import "./App.scss";
import { Calender } from "./components/calendar/calendar";
import { CalendarContextProvider } from "./context/calendar-context";
import { MainLayout } from "./layout/main-layout";

function App() {
    return (
        <CalendarContextProvider>
            <MainLayout>
                <Calender />
            </MainLayout>
        </CalendarContextProvider>
    );
}

export default App;
