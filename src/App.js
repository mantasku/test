import React, { useState } from "react";
import "./styles.css";
import InlineEdit from "./components/inlineEdit";
import { NEEDS_COMMON_MANTAS, NEEDS_UNMET_MANTAS, NEEDS_MET_ROL } from "./data/data";
import FontSizeChanger from "react-font-size-changer";
import {
  Accordion,
  Card,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Form,
  Navbar,
} from "react-bootstrap";

export default function App() {
  const DEFAULT_COLOR = "black";

  const [choice, setChoice] = useState([]);
  const [spalva, setSpalva] = useState({ color: DEFAULT_COLOR });
  const [cbox, setCbox] = useState(false);
  const [stickyCbox, setStickyCbox] = useState(false);

  const [side1, setSide1] = useState("1 pusė");
  const [side2, setSide2] = useState("2 pusė");
  const [side3, setSide3] = useState("Drauge");

  const [poreikiaiPirma, setPoreikiaiPirma] = useState([]);
  const [poreikiaiAntra, setPoreikiaiAntra] = useState([]);
  const [poreikiaiKartu, setPoreikiaiKart] = useState([]);

  const [jausmaiPirma, setJausmaiPirma] = useState([]);
  const [jausmaiAntra, setJausmaiAntra] = useState([]);
  const [jausmaiKartu, setJausmaiKartu] = useState([]);

  const sides = {
    firstSide: "Pirma pusė",
    secondSide: "Antra pusė",
    together: "Abi pusės",
  };
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);
  const getColor = () => {
    // keiciasi priklausomai nuo puses pasirinkimo
    if (choice == sides.firstSide) {
      return "red";
    }
    if (choice == sides.secondSide) {
      return "blue";
    }
    if (choice == sides.together) {
      return "green";
    }
  };
  const setColor = (e) => {
    const targetColor = e.target.style.color;
    const tagName = e.target.tagName;
    const choiceColor = getColor();
    const textContent = e.target.textContent;
    const classOfJausmOrPoreik =
      e.target.parentElement.parentElement.parentElement.parentElement
        .className;
    
    console.log(
      `target color: ${targetColor} choice color: ${choiceColor}\tagName: ${tagName} text: ${textContent} class: ${classOfJausmOrPoreik}`
    );
    let newColor = DEFAULT_COLOR;
    // add to list if conditions are met
    if (
      targetColor != choiceColor &&
      newColor != null &&
      choiceColor != undefined &&
      tagName == "LI"
    ) {
      newColor = choiceColor;

      if (classOfJausmOrPoreik == "poreikiai") {
        // adding element and removing dublicates from array

        if (
          choice == sides.firstSide &&
          poreikiaiPirma.indexOf(textContent) === -1
        ) {
          setPoreikiaiPirma((oldArray) => [...oldArray, textContent]);
          setPoreikiaiAntra(poreikiaiAntra.filter((e) => e !== textContent));
          setPoreikiaiKart(poreikiaiKartu.filter((e) => e !== textContent));
        }
        if (
          choice == sides.secondSide &&
          poreikiaiAntra.indexOf(textContent) === -1
        ) {
          setPoreikiaiAntra((oldArray) => [...oldArray, textContent]);
          setPoreikiaiPirma(poreikiaiPirma.filter((e) => e !== textContent));
          setPoreikiaiKart(poreikiaiKartu.filter((e) => e !== textContent));
        }
        if (
          choice == sides.together &&
          poreikiaiKartu.indexOf(textContent) === -1
        ) {
          setPoreikiaiKart((oldArray) => [...oldArray, textContent]);
          setPoreikiaiPirma(poreikiaiPirma.filter((e) => e !== textContent));
          setPoreikiaiAntra(poreikiaiAntra.filter((e) => e !== textContent));
        }
      }

      if (classOfJausmOrPoreik == "jausmai") {
        // adding element and removing dublicates from array
        if (
          choice == sides.firstSide &&
          jausmaiPirma.indexOf(textContent) === -1
        ) {
          setJausmaiPirma((oldArray) => [...oldArray, textContent]);
          setJausmaiAntra(jausmaiAntra.filter((e) => e !== textContent));
          setJausmaiKartu(jausmaiKartu.filter((e) => e !== textContent));
        }
        if (
          choice == sides.secondSide &&
          jausmaiAntra.indexOf(textContent) === -1
        ) {
          setJausmaiAntra((oldArray) => [...oldArray, textContent]);
          setJausmaiPirma(jausmaiPirma.filter((e) => e !== textContent));
          setJausmaiKartu(jausmaiKartu.filter((e) => e !== textContent));
        }
        if (
          choice == sides.together &&
          jausmaiKartu.indexOf(textContent) === -1
        ) {
          setJausmaiKartu((oldArray) => [...oldArray, textContent]);
          setJausmaiPirma(jausmaiPirma.filter((e) => e !== textContent));
          setJausmaiAntra(jausmaiAntra.filter((e) => e !== textContent));
        }
      }
    } else {
      newColor = null;
      // remove element from list
      if (classOfJausmOrPoreik == "poreikiai") {
        setPoreikiaiPirma(poreikiaiPirma.filter((e) => e !== textContent));
        setPoreikiaiAntra(poreikiaiAntra.filter((e) => e !== textContent));
        setPoreikiaiKart(poreikiaiKartu.filter((e) => e !== textContent));
        e.target.parentElement.classList.remove("pazymetas");
      }
      if (classOfJausmOrPoreik == "jausmai") {
        setJausmaiPirma(jausmaiPirma.filter((e) => e !== textContent));
        setJausmaiAntra(jausmaiAntra.filter((e) => e !== textContent));
        setJausmaiKartu(jausmaiKartu.filter((e) => e !== textContent));
        e.target.parentElement.classList.remove("pazymetas");
      }
    }
    e.target.style.color = newColor;

    console.log(targetColor);
    console.log(newColor);
  };

  return (
    <Container fluid="false" style={{ backgroundColor: "whitesmoke" }}>
        <Navbar
        className="color-nav"
         bg="light" variant="light"  sticky={stickyCbox ? "top" : ""}

        >
          <div className="puses">
            <div
              className="pusesElementas"
              onClick={(e) => setChoice(sides.firstSide)}
            >
              <div
                className={`colorSelect red column ${
                  choice === sides.firstSide && "pasirinktaPuse"
                } `}
              ></div>

              <InlineEdit text={side1} onSetText={(text) => setSide1(text)} />
            </div>
            <div
              className="pusesElementas"
              onClick={() => setChoice(sides.secondSide)}
            >
              <div
                className={`colorSelect blue column ${
                  choice === sides.secondSide && "pasirinktaPuse"
                } `}
              ></div>
              <InlineEdit text={side2} onSetText={(text) => setSide2(text)} />
            </div>
            <div
              className="pusesElementas"
              onClick={() => setChoice(sides.together)}
            >
                
              <div
                className={`colorSelect green column ${
                  choice === sides.together && "pasirinktaPuse"
                } `}
              ></div>
              <InlineEdit text={side3} onSetText={(text) => setSide3(text)} />
            </div>
                        <div
              className="pusesElementas"
              onClick={() => setChoice(sides.together)}
            >

            </div>
              
            <div className={"options"}>
              <Form.Check
                type="checkbox"
                checked={cbox}
                label="Slėpti nepažymėtus"
                onChange={() => {
                  setCbox(!cbox);
                }}
              />{" "}

                <Form.Check
                type="checkbox"
                checked={stickyCbox}
                label="Priklijuoti"
                onChange={() => {
                  setStickyCbox(!stickyCbox);
                }}
              />{" "} 
            </div>
          </div>
          <FontSizeChanger
                targets={[".Column li"]}
                onChange={(element, newValue, oldValue) => {
                  console.log(element, newValue, oldValue);
                }}
                options={{
                  stepSize: 1,
                  range: 5,
                }}
              />
        </Navbar>
    <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Poreikiai
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="suspaustasIsdestimas">
              {" "}
              <div className="Column">
                {NEEDS_COMMON_MANTAS.map((s) => (
                  <div className="poreikiai">
                    <h4>{s.title}</h4>
                    <div style={spalva} onClick={(e) => setColor(e)}>
                      <ol>
                        {s.elements.map((poreikis) => (
                          <Col>
                            <li
                              className={cbox ? "hidden" : false}
                              key={poreikis}
                            >
                              {poreikis}
                            </li>
                          </Col>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>


      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Kokius jausmus jaučime, kai poreikiai nėra patenkinti
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {" "}
              <div className="Column" >
                <Row>
                  {NEEDS_UNMET_MANTAS.map((s) => (
                    <div className="jausmai">
                      <h4>{s.title }</h4 >
                      <div style={spalva} onClick={(e) => setColor(e)}>
                        <ol>
                          {s.elements.map((jausmas) => (
                            <Col>
                              <li 
                              className={cbox ? "hidden" : false}
                              key={jausmas}>{jausmas}</li>
                            </Col>
                          ))}
                        </ol>
                      </div>
                    </div>
                  ))}
                </Row>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Jausmai, kai poreikiai patenkinti
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {" "}
              <div className="Column">
                <Row>
                  {NEEDS_MET_ROL.map((s) => (
                    <div className="jausmai">
                      <h4>{s.title}</h4>
                      <div style={spalva} onClick={(e) => setColor(e)}>
                        <ol>
                          {s.elements.map((jausmas) => (
                            <Col>
                              <li
                              className={cbox ? "hidden" : false}
                              key={jausmas}
                              key={jausmas}>{jausmas}</li>
                            </Col>
                          ))}
                        </ol>
                      </div>
                    </div>
                  ))}
                </Row>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <hr />
      <Container>


      <p >
        Konstruktyvus konflikto deeskalavimas atsižvelgiant į abiejų pusių
        poreikius ir jausmus.
      </p>
  <Accordion >
        <div className="text">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                1. Pavyzdys - konfliktą eskaluojantis bandymas suprasti kitą pusę 
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                   <Row>
                        <Col><b>Stebėjimas sulipęs su vertinimu </b></Col>
                          <Col><b>Nesuprastas jausmas</b></Col>
                         <Col><b>Nesuprastas poreikis</b></Col>
                    </Row>
                  <Row>
                      <p></p>{" "}
                  </Row>
                      <Row>                        
                          <Col>Kai mes diskutuojame tavo tonas nuolat<sup>1</sup> pakeltas<sup>2</sup></Col>
                          <Col>nesuprantu kas tau yra</Col>
                          <Col>ko tu čia keli tą balsą?</Col>                        
                    </Row>
               
                </Card.Body>
              </Accordion.Collapse>
            </Card>
      </div>
          </Accordion>
    <Accordion >
        <div className="text">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                 1. Pavyzdys - konstruktyvus bandymas suprasti kitą pusę
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
             <Row>
                        <Col><b>Stebėjimas atskirtas nuo vertinimo</b></Col>
                          <Col><b>Jausmas</b></Col>
                         <Col><b>Poreikis</b></Col>
                    </Row>
                  <Row>
                      <p></p>{" "}
                  </Row>
                      <Row>                        
                          <Col><i><b>Pastebiu</b></i>, kad kai mes pastaruosius tris kartus diskutavome<sup>1</sup> - tavo balso tonas pakildavo<sup>2</sup> viduryje pokalbio</Col>
                          <Col>iš to <i><b>spėju kad jauti</b></i> susierzines</Col>
                         <Col>ar gerai tave suprantu, kad tau <i><b>norisi daugiau </b></i> empatijos kai mes deskutuojame?</Col>
                        
                    </Row>
               
                </Card.Body>
              </Accordion.Collapse>
            </Card>
      </div>
          </Accordion>
          
      <Accordion >
        <div className="text">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <b>1. Žingsnis.</b> Atspindėjimas kitos pusės jausmus ir
                poreikius.
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                  
                <Row>

                  <Col> 
                    <p>
                      <i>Pastebiu..</i>
                    </p>
                    <Form>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={2} /> <br/>
                        <Form.Control as="textarea" rows={2} />  <br/>
                        <Form.Control as="textarea" rows={2} /> <br/>
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col>
                    <p>
                      <i>iš to spėju kad jauti ...  </i>
                    </p>
                    {jausmaiAntra.map((element) => (
                      <p className="text " style={{ color: "blue" }}>
                        {element}
                      </p>
                    ))}{" "}
                    {jausmaiKartu.map((element) => (
                      <p className="text " style={{ color: "green" }}>
                        {element}
                      </p>
                    ))}{" "}

                  </Col>
                  <Col>
                    <p>
                      <i> tau norisi daugiau ... ?</i>
                    </p>
                    {poreikiaiAntra.map((element) => (
                      <p className="text " style={{ color: "blue" }}>
                        {element}
                      </p>
                    ))}{" "}
                    {poreikiaiKartu.map((element) => (
                      <p className="text " style={{ color: "green" }}>
                        {element}
                      </p>
                    ))}{" "}
                  </Col>
                
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </div>
      </Accordion>

      <hr />
           <Accordion >
        <div className="text">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                   2. Pavyzdys - konfliktą eskaluojantis bandymas išreikšti savo pusę
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                   <Row>
                        <Col><b>Stebėjimas sulipęs su vertinimu </b></Col>
                        <Col><b>Neišreikštas jausmas</b></Col>
                         <Col><b>Neišreištas poreikis</b></Col>
                         <Col><b>Reikalavimas</b></Col>
                    </Row>
                  <Row>
                      <p></p>{" "}
                  </Row>
   <Row>
                           
                          <Col>Kai tik diskutuojam<sup>1</sup> taip ir susipykstam <sup>2</sup></Col>
                          <Col>jaučiu, kad mes visai nesuderinami</Col>
                         <Col>kiek galima taip pyktis</Col>
                         <Col>prašau, kad kitą syk susitvardytum kai kalbėsimės!</Col>
                         
                         
                    </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
      </div>
          </Accordion>
                     <Accordion >
        <div className="text">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
               2. Pavyzdys - konstruktyvus bandymas išreikšti savo pusę
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                                                                          <Row>
                           
                        <Col><b>Stebėjimas atskirtas nuo vertinimo</b></Col>
                        <Col><b>Jausmas</b></Col>
                         <Col><b>Poreikis</b></Col>
                         <Col><b>Prašymas + strategija</b></Col>
                    </Row>
                  <Row>
                      <p></p>{" "}
                  </Row>
  
                                      <Row>
                           
                          <Col><i><b>Pastebiu</b></i>, kad kai mes pastaruosius tris diskutavome<sup>1</sup> - susipykome <sup>2</sup></Col>
                          <Col><i><b> jaučiu  </b></i> liūdesį</Col>
                         <Col>man <i><b>norisi daugiau</b></i> darnos kai mes diskutuojame</Col>
                         <Col><i><b>ar tau tiktų </b></i> jeigu diskutuodami pradžioje pasistengtume įvardinti kokius jausmus jaučiame apie diskutuojamą situaciją ? </Col>
                    </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
      </div>
          </Accordion>
      <Accordion className="text">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <b>2. Žingsnis.</b> Išsakymas savo jausmų ir poreikių.
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>     
              <Row>
                <Col>
                  <p>
                    <i>Pastebiu...</i>
                  </p>
                  <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Control as="textarea" rows={2} /><br/>
                     <Form.Control as="textarea" rows={2} /><br/>
                        <Form.Control as="textarea" rows={2} /><br/>
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <p>
                    <i>jaučiu...</i>
                  </p>
                  {jausmaiPirma.map((element) => (
                    <p className="text " style={{ color: "red" }}>
                      {element}
                    </p>
                  ))}{" "}
                  {jausmaiKartu.map((element) => (
                    <p className="text " style={{ color: "green" }}>
                      {element}
                    </p>
                  ))}{" "}
                </Col>
                <Col>
                  <p>                 
                  
                    <i>man norisi daugiau...</i>
                  </p>
                  {poreikiaiPirma.map((element) => (
                    <p className="text " style={{ color: "red" }}>
                      {element}
                    </p>
                  ))}{" "}
                  {poreikiaiKartu.map((element) => (
                    <p className="text " style={{ color: "green" }}>
                      {element}
                    </p>
                  ))}{" "}

                </Col>
                <Col>
                  <p>                    
                    <i>ar tau tiktų jeigu...?</i>
                  </p>

                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      </Container>

    </Container>
  );
}
