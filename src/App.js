import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getAllItems } from "./api";
import ApiErrorMessage from "./components/ApiErrorMessage";
import Header from "./components/Header";
import List from "./components/List";
import UpsertModal from "./components/UpsertModal";

function App() {

  const [modalOpen, setModalOpen] = useState({ show: false, type: '', itemToUpdateId: null });
  const [apiError, setApiError] = useState({ show: false, error: {} });
  const [itemsList, setItemsList] = useState([]);

  useEffect(()=> {
    console.log('API ERROR APP',apiError)
  }, [apiError])
  // get items
  useEffect(() => {
    async function getItems() {
      const res = await getAllItems()
      if (res.error === true) {
        console.log(res)
        setApiError((prev)=>({...prev, ...{ show: true, error: {name: res.name, message: res.message } }}));
        console.log(apiError);
        return;
      }
      setItemsList(res.response)
      return;
    }
    getItems();
  }, [modalOpen])

  const createApiError = (error) => {
    setApiError({ show: true, error });
  }
  const closeApiError = () => {
    console.log('chiudo modale di errore dell api')
    setApiError({ show: false, error: null })
  }

  console.log(apiError.show)
  return (
    <div>
      <Header appName={'EXAM'}></Header>
      { /* c'è un errore nel API ? */}
      {
        apiError.show &&
        <ApiErrorMessage
          show={apiError.show}
          error={apiError.error}
          onClose={closeApiError}
        />
      }
      { /* modale è aperta ?*/}
      {
      modalOpen.show &&
        <UpsertModal
          show= {modalOpen.show}
          modalSetting={modalOpen}
          onClose={() => {
            setModalOpen((prev) => ({ ...prev, show: false }))

          }}
          createApiError={createApiError}
        >
        </UpsertModal>
      }
      
      <br />

      <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Button
          size="lg"
          variant="success"
          onClick={() => setModalOpen({ show: true, type: "create" })}
        >
          Create
        </Button>
      </div>

      <List itemsList={itemsList} createApiError={createApiError} setModalOpen={setModalOpen}></List>

    </div>
  )

}

export default App;
