import React, { useState, useEffect } from 'react'
import _ from "lodash"
import { Col, Container, Row, Jumbotron, Accordion, Card, Button, Table, Modal, Form } from 'react-bootstrap'
function EgitimBilimleri() {
    const [lisansUstYayin,setLisansUstYayin]=useState({
        sum:0,
        sumDoktoraOncesi:0,
        sumDoktoraSonrasi:0,
        items:[],
        maxPoint:10
    });
    const [ulusalMakale,setUlusalMakale]=useState({
        sum:0,
        sumDoktoraOncesi:0,
        sumDoktoraSonrasi:0,
        items:[],
    });

    const [atiflar,setAtiflar]=useState({
        sum:0,
        sumDoktoraOncesi:0,
        sumDoktoraSonrasi:0,
        items:[],
        maxPoint:20
    });

    const [uluslararasi,setUluslararasi]=useState({
        sum:0,
        sumDoktoraOncesi:0,
        sumDoktoraSonrasi:0,
        items:[],
    });

    const [basvurabilirMi,setBasvurabilirMi] = useState(false);
    const [show, setShow] = useState(false);

    const [clickedProps, setClickedProps] = useState({
        clickedBentPoint: 0,
        clickedBentName: '',
        clickedBentParentName: '',
        clickedBentMaxPoint: 0
    });

    const [kacKisi, setKacKisi] = useState(1);

    const [kacAdet, setKacAdet] = useState(1);
    const [oncemiSonrami, setOncemiSonrami] = useState(1);


    const handleClose = () => setShow(false);

    const handleShow = (bentPoint, bentName, bentParentName, bentMaxPoint) => {
        setShow(true);
        setClickedProps({
            clickedBentName: bentName,
            clickedBentPoint: bentPoint,
            clickedBentParentName: bentParentName,
            clickedBentMaxPoint: bentMaxPoint
        });
        setKacKisi(1);
        setKacAdet(1);
        setOncemiSonrami(1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let yeniFaaliyet = {
            bentName:clickedProps.clickedBentName,
            bentParentName:clickedProps.clickedBentParentName,
            kacAdet,
            kacKisi,
            point:clickedProps.clickedBentPoint*kacAdet,
            resultPoint: (clickedProps.clickedBentPoint * kacAdet) / kacKisi,
            doktoraOncesimi:oncemiSonrami==1
        }
            //burada interfacelerden yararlan. nesne dayal?? progralama yap...

        if(clickedProps.clickedBentParentName=="At??flar"){
            var sum = [...atiflar.items,yeniFaaliyet].reduce((acc, b) => acc + b.resultPoint, 0);
            var sumDoktoraOncesi = [...atiflar.items,yeniFaaliyet].reduce((acc,b) => {return !b.doktoraOncesimi ? acc:acc+b.resultPoint}, 0);
            var sumDoktoraSonrasi = sum-sumDoktoraOncesi;
            setAtiflar({
                maxPoint:20,
                sum,
                sumDoktoraOncesi,
                sumDoktoraSonrasi,
                items:[...atiflar.items,yeniFaaliyet]
            })
        }
        else if(clickedProps.clickedBentName.startsWith('1')){
            var sum = [...uluslararasi.items,yeniFaaliyet].reduce((acc, b) => acc + b.resultPoint, 0);
            var sumDoktoraOncesi = [...uluslararasi.items,yeniFaaliyet].reduce((acc,b) => {return !b.doktoraOncesimi ? acc:acc+b.resultPoint}, 0);
            var sumDoktoraSonrasi = sum-sumDoktoraOncesi;
            setUluslararasi({
                sum,
                sumDoktoraOncesi,
                sumDoktoraSonrasi,
                items:[...uluslararasi.items,yeniFaaliyet]
            })
        }
        else if(clickedProps.clickedBentName.startsWith('2')){
            var sum = [...ulusalMakale.items,yeniFaaliyet].reduce((acc, b) => acc + b.resultPoint, 0);
            var sumDoktoraOncesi = [...ulusalMakale.items,yeniFaaliyet].reduce((acc,b) => {return !b.doktoraOncesimi ? acc:acc+b.resultPoint}, 0);
            var sumDoktoraSonrasi = sum-sumDoktoraOncesi;
            setUlusalMakale({
                sum,
                sumDoktoraOncesi,
                sumDoktoraSonrasi,
                items:[...ulusalMakale.items,yeniFaaliyet]
            })
        }
        else if(clickedProps.clickedBentName.startsWith('3')){
            var sum = [...lisansUstYayin.items,yeniFaaliyet].reduce((acc, b) => acc + b.resultPoint, 0);
            var sumDoktoraOncesi = [...lisansUstYayin.items,yeniFaaliyet].reduce((acc,b) => {return !b.doktoraOncesimi ? acc:acc+b.resultPoint}, 0);
            var sumDoktoraSonrasi = sum-sumDoktoraOncesi;
            setLisansUstYayin({
                sum,
                sumDoktoraOncesi,
                sumDoktoraSonrasi,
                items:[...lisansUstYayin.items,yeniFaaliyet],
                maxPoint:10
            })
        }
        console.log(ulusalMakale);
        handleClose();
    }

    const doktoraOncesiSil = (bentName) => {
        if(bentName.startsWith('5')){
            var newList = atiflar.items.filter(item=>item.bentName!=bentName && item.doktoraOncesimi);
            var sumDoktoraOncesi = newList.reduce((acc,b) => {return !b.doktoraOncesimi ? acc:acc+b.resultPoint}, 0);
            var sum = newList.reduce((acc,b) => acc+b.resultPoint, 0);
            setAtiflar({
                ...atiflar,sum,sumDoktoraOncesi,items:newList
            })
        }
        else if(bentName.startsWith('1')){
            var newList = uluslararasi.items.filter(item=>item.bentName!=bentName && item.doktoraOncesimi);
            var sumDoktoraOncesi = newList.reduce((acc,b) => {return !b.doktoraOncesimi ? acc:acc+b.resultPoint}, 0);
            var sum = newList.reduce((acc,b) => acc+b.resultPoint, 0);
            setUluslararasi({
                ...uluslararasi,sum,sumDoktoraOncesi,items:newList
            })
        }
        else if(bentName.startsWith('2')){
            var newList = ulusalMakale.items.filter(item=>item.bentName!=bentName && item.doktoraOncesimi);
            var sumDoktoraOncesi = newList.reduce((acc,b) => {return !b.doktoraOncesimi ? acc:acc+b.resultPoint}, 0);
            var sum = newList.reduce((acc,b) => acc+b.resultPoint, 0);
            setUlusalMakale({
                ...ulusalMakale,sum,sumDoktoraOncesi,items:newList
            })
        }
        else if(bentName.startsWith('3')){
            var newList = lisansUstYayin.items.filter(item=>item.bentName!=bentName && item.doktoraOncesimi);
            var sumDoktoraOncesi = newList.reduce((acc,b) => {return !b.doktoraOncesimi ? acc:acc+b.resultPoint}, 0);
            var sum = newList.reduce((acc,b) => acc+b.resultPoint, 0);
            setLisansUstYayin({
                ...lisansUstYayin,sum,sumDoktoraOncesi,items:newList
            })
        }
    }

    const doktoraSonrasiSil = (bentName) => {
        
        if(bentName.startsWith('5')){
            var newList = atiflar.items.filter(item=>item.bentName!=bentName && !item.doktoraOncesimi)
            var sumDoktoraSonrasi = newList.reduce((acc,b) => {return b.doktoraOncesimi ? acc:acc+b.resultPoint}, 0);
            var sum = newList.reduce((acc,b) => acc+b.resultPoint, 0);
            setAtiflar({
                ...atiflar,sum,sumDoktoraSonrasi,items:newList
            })
        }
        else if(bentName.startsWith('1')){
            var newList = uluslararasi.items.filter(item=>item.bentName!=bentName && !item.doktoraOncesimi)
            var sumDoktoraSonrasi = newList.reduce((acc,b) => {return b.doktoraOncesimi ? acc:acc+b.resultPoint}, 0);
            var sum = newList.reduce((acc,b) => acc+b.resultPoint, 0);
            setUluslararasi({
                ...uluslararasi,sum,sumDoktoraSonrasi,items:newList
            })
        }
        else if(bentName.startsWith('2')){
            var newList = ulusalMakale.items.filter(item=>item.bentName!=bentName && !item.doktoraOncesimi)
            var sumDoktoraSonrasi = newList.reduce((acc,b) => {return b.doktoraOncesimi ? acc:acc+b.resultPoint}, 0);
            var sum = newList.reduce((acc,b) => acc+b.resultPoint, 0);
            setUlusalMakale({
                ...ulusalMakale,sum,sumDoktoraSonrasi,items:newList
            })
        }
        else if(bentName.startsWith('3')){
            var newList = lisansUstYayin.items.filter(item=>item.bentName!=bentName && !item.doktoraOncesimi)
            var sumDoktoraSonrasi = newList.reduce((acc,b) => {return b.doktoraOncesimi ? acc:acc+b.resultPoint}, 0);
            var sum = newList.reduce((acc,b) => acc+b.resultPoint, 0);
            setLisansUstYayin({
                ...lisansUstYayin,sum,sumDoktoraSonrasi,items:newList
            })
        }
    }

    let rules = {
        uluslararasimakale: function () {
            var rule1 = uluslararasi.items.filter(item => item.bentName == '1-a').reduce((acc, b) => acc + b.resultPoint, 0);
            var rule2 = uluslararasi.items.filter(item => item.bentName == '1-b').reduce((acc, b) => acc + b.resultPoint, 0);
            return rule1 >= 20 || rule2 >= 10;
        },
        ulusalmakale: function () {
            var rule1 = ulusalMakale.items.filter(item => item.bentName == '2-a').reduce((acc, b) => acc + parseInt(b.kacAdet), 0);
            var rule2 = ulusalMakale.items.filter(item => item.bentName == '2-b').reduce((acc, b) => acc + parseInt(b.kacAdet), 0);
            
            return rule1 >= 2 && ((rule1 + rule2) >= 3)
        },
        lisansUstuTezler:function(){
            var rule1  = lisansUstYayin.items.filter(item => item.bentName.startsWith('3')).reduce((acc, b) => acc + parseInt(b.kacAdet), 0);
            return rule1 >=1;
        },
        atiflar_rule:function(){
            return atiflar.sum>=4;
        }

    }

    const canApply = () => {
        var allRulesIsTrue = rules.atiflar_rule() && rules.uluslararasimakale() && rules.ulusalmakale()
        && rules.lisansUstuTezler();
        setBasvurabilirMi(allRulesIsTrue);
        return allRulesIsTrue;
    }

    useEffect(() => {
        canApply();
    }, [atiflar,ulusalMakale,uluslararasi,lisansUstYayin]);
    return (
        <>
            <Container>
                <Row>
                    <Col md="12">
                        <Jumbotron>
                            {alan.aciklama}
                            <h1>Ba??vuru ??artlar??</h1>
                            <p>
                                E??itim bilimleri temel alan??nda ba??vurulan do??entlik bilim alan?? ile ilgili olarak a??a????daki
                                ??al????malara verilen birim puanlar esas al??nmak suretiyle; en az doksan (90) puan??n??n
                                doktora unvan??n??n al??nmas??ndan sonra ger??ekle??tirilen ??al????malardan elde edilmi??
                                olmas?? kayd??yla, asgari y??z (100) puan kar????l?????? bilimsel etkinlikte bulunmu?? olmas??
                                gerekir. Her ??al????ma Tablo 1' de sadece bir b??l??mde yaz??larak puanland??r??l??r.
                        </p>
                            <p>
                                Tek yazarl?? yay??nlarda yazar tam puan al??r. ??ok yazarl?? yay??nlarda puan yazarlar aras??nda
                                e??it olarak b??l??n??r.
                        </p>
                        </Jumbotron>
                    </Col>
                    <Col md="12">
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        1. Uluslararas?? Makale
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <p>
                                            Ba??vurulan do??entlik bilim alan?? ile ilgili ve aday??n haz??rlad?????? lisans??st?? tezlerden
                                            ??retilmemi?? olmak kayd??yla
                                    </p>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Faaliyet</th>
                                                    <th>Puan</th>
                                                    <th>????lemler</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               <Bent />
                                            </tbody>
                                        </Table>
                                        <p>
                                            <i>Bu maddenin a veya b bentleri kapsam??nda <b>en az 20 puan</b> almak zorunludur.</i>
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        2. Ulusal Makale
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <p>
                                            Ba??vurulan do??entlik bilim alan?? ile ilgili ve aday??n yapt?????? lisans??st?? tezlerden
                                            ??retilmemi?? olmak kayd??yla
                                    </p>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Faaliyet</th>
                                                    <th>Puan</th>
                                                    <th>????lemler</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>a</td>
                                                    <td>ULAKB??M taraf??ndan taranan ulusal hakemli dergilerde yay??mlanm????
makale</td>
                                                    <td>8</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(8, '2-a', 'Ulusal Makale', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>b</td>
                                                    <td>a bendi d??????ndaki ulusal hakemli dergilerde yay??mlanm???? makale</td>
                                                    <td>4</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(4, '2-b', 'Ulusal Makale', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <p>
                                            <i>??kisi bu maddenin a bendi kapsam??nda olmak ??zere <b>en az ???? yay??n</b> yapmak
zorunludur.Yabanc?? uyruklu adaylar ile yurtd?????? do??entlik denkli??i ba??vurusu yapan
adaylar , ULAKB??M taraf??ndan taranan ulusal hakemli dergilerde yay??mlanm???? makale
??art??n?? sa??layamamalar?? durumunda, bunun yerine ayn?? say??daki yay??n?? 1.maddenin a
ve/veya b bentleri kapsam??nda sa??layacaklard??r.</i>
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                        3. Lisans??st?? Tezlerden ??retilmi?? Yay??n
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        <p>
                                            Aday??n haz??rlad?????? lisans??st?? tezleriyle ilgili olmak kayd??yla
                                    </p>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Faaliyet</th>
                                                    <th>Puan</th>
                                                    <th>????lemler</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>a</td>
                                                    <td>Uluslararas?? yay??nevleri taraf??ndan yay??mlanm???? kitap </td>
                                                    <td>10</td>
                                                    <td><Button variant="primary" onClick={() => handleShow(10, '3-a', 'Lisans??st?? Tezlerden ??retilmi?? Yay??n', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>b</td>
                                                    <td>Uluslararas?? yay??nevleri taraf??ndan yay??mlanm???? kitapta b??l??m</td>
                                                    <td>8</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(8, '3-b', 'Lisans??st?? Tezlerden ??retilmi?? Yay??n', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>c</td>
                                                    <td>Ulusal yay??nevleri taraf??ndan yay??mlanm???? kitap </td>
                                                    <td>5</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(5, '3-c', 'Lisans??st?? Tezlerden ??retilmi?? Yay??n', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>d</td>
                                                    <td>Ulusal yay??nevleri taraf??ndan yay??mlanm???? kitapta b??l??m</td>
                                                    <td>4</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(4, '3-d', 'Lisans??st?? Tezlerden ??retilmi?? Yay??n', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>e</td>
                                                    <td> SSCI, SCI, SCI-Expanded ve AHCI kapsam??ndaki dergilerde yay??mlanm????
makale</td>
                                                    <td>8</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(8, '3-e', 'Lisans??st?? Tezlerden ??retilmi?? Yay??n', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>f</td>
                                                    <td>Uluslararas?? alan endekslerinde taranan dergilerde yay??mlanm???? makale</td>
                                                    <td>6</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(6, '3-f', 'Lisans??st?? Tezlerden ??retilmi?? Yay??n', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>g</td>
                                                    <td> ULAKB??M taraf??ndan taranan dergilerde yay??mlanm???? makale</td>
                                                    <td>4</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(4, '3-g', 'Lisans??st?? Tezlerden ??retilmi?? Yay??n', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <p>
                                            <i>Bu madde kapsam??nda <b>en az 1 yay??n</b> zorunludur. Bu maddeden <b>en fazla 10 puan </b>
 al??nabilir</i>
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                        4. Kitap
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                        <p>Aday??n haz??rlad?????? lisans??st?? tezlerinden ??retilmemi?? ve ba??vurulan do??entlik bilim alan??
ile ilgili olmak kayd??yla</p>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Faaliyet</th>
                                                    <th>Puan</th>
                                                    <th>????lemler</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>a</td>
                                                    <td>Uluslararas?? yay??nevleri taraf??ndan yay??mlanm???? kitap</td>
                                                    <td>20</td>
                                                    <td><Button variant="primary" onClick={() => handleShow(20, '4-a', 'Kitap', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>b</td>
                                                    <td>Uluslararas?? yay??nevleri taraf??ndan yay??mlanm???? kitap edit??rl?????? veya
b??l??m yazarl??????</td>
                                                    <td>10</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(10, '4-b', 'Kitap', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>c</td>
                                                    <td>Ulusal yay??nevleri taraf??ndan yay??mlanm???? kitap</td>
                                                    <td>15</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(15, '4-c', 'Kitap', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>d</td>
                                                    <td> Ulusal yay??nevleri taraf??ndan yay??mlanm???? kitap edit??rl?????? veya b??l??m
yazarl??????</td>
                                                    <td>8</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(8, '4-d', 'Kitap', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <p>
                                            <i>Bu madde kapsam??nda sadece ders kitab?? niteli??i d??????ndaki ??zg??n bilimsel kitaplar
puanlanabilir, ayn?? kitaptaki b??l??mlerden en fazla ikisi dikkate al??n??r. Alana ??zg??
ansiklopedi maddelerinin ???? veya daha ??ok maddesi bir kitap b??l??m?? kabul edilir</i>
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="4">
                                        5. At??flar
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="4">
                                <Card.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Faaliyet</th>
                                                    <th>Puan</th>
                                                    <th>????lemler</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>a</td>
                                                    <td>SCI, SCI-Expanded, SSCI ve AHCI taraf??ndan taranan dergilerde;
Uluslararas?? yay??nevleri taraf??ndan yay??mlanm???? kitaplarda yay??mlanan ve
aday??n yazar olarak yer almad?????? yay??nlardan her birinde, metin i??indeki
at??f say??s??na bak??lmaks??z??n aday??n at??f yap??lan her eseri i??in</td>
                                                    <td>3</td>
                                                    <td><Button variant="primary" onClick={() => handleShow(3, '5-a', 'At??flar', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>b</td>
                                                    <td>SCI, SCI-Expanded, SSCI ve AHCI d??????ndaki endeksler taraf??ndan taranan
dergilerde; Uluslararas?? yay??nevleri taraf??ndan yay??mlanm???? kitaplarda
b??l??m yazar?? olarak yay??mlanan ve aday??n yazar olarak yer almad??????
yay??nlardan her birinde, metin i??indeki at??f say??s??na bak??lmaks??z??n aday??n
at??f yap??lan her eseri i??in
</td>
                                                    <td>2</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(2, '5-b', 'At??flar', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>c</td>
                                                    <td>Ulusal hakemli dergilerde; Ulusal yay??nevleri taraf??ndan yay??mlanm????
kitaplarda yay??mlanan ve aday??n yazar olarak yer almad?????? yay??nlardan her
birinde, metin i??indeki at??f say??s??na bak??lmaks??z??n aday??n at??f yap??lan her
eseri i??in</td>
                                                    <td>1</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(1, '5-c', 'At??flar', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <p>
                                            <i>Bu madde kapsam??nda <b>en az 4</b> puan al??nmas?? zorunludur.Bu madde kapsam??nda <b>en
fazla 20 puan</b> al??nabilir</i>
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="5">
                                        6. Lisans??st?? Tez Dan????manl??????
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="5">
                                <Card.Body>
                                    <p>Aday??n dan????manl??????n?? y??r??tt?????? tamamlanan lisans??st?? tezlerden</p>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Faaliyet</th>
                                                    <th>Puan</th>
                                                    <th>????lemler</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>a</td>
                                                    <td>Doktora tez dan????manl??????</td>
                                                    <td>4</td>
                                                    <td><Button variant="primary" onClick={() => handleShow(4, '6-a', 'Lisans??st?? Tez Dan????manl??????', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>b</td>
                                                    <td>Y??ksek lisans tez dan????manl??????</td>
                                                    <td>2</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(2, '5-b', 'At??flar', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                
                                            </tbody>
                                        </Table>
                                        <p>
                                            <i>
                                            Bu madde kapsam??nda <b>en fazla 10 </b> puan al??nabilir. ??kinci/e?? dan????man olmas??
durumunda as??l dan????man a ve b bentleri i??in ??ng??r??len puanlar??n tamam??n??, ikinci
dan????man ise yar??s??n?? al??r.
                                            </i>
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="6">
                                        7. Bilimsel Ara??t??rma Projesi
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="6">
                                    <Card.Body>Hello! I'm another body</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="7">
                                        8. Bilimsel Toplant?? Faaliyeti (Ba??vurulan bilim alan?? ile ilgili ve aday??n haz??rlad??????
                                        lisans??st?? tezlerden ??retilmemi?? olmak kayd??yla)
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="7">
                                    <Card.Body>Hello! I'm another body</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="8">
                                        9. E??itim-????retim Faaliyeti
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="8">
                                    <Card.Body>Hello! I'm another body</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                    <Col md="12">
                        <div style={{ marginTop: "20px" }}>
                            <h3>Doktora ??ncesi</h3>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Konu</th>
                                        <th>Ki??i</th>
                                        <th>Adet</th>
                                        <th>Puan</th>
                                        <th>Sonu??</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {uluslararasi.items.filter(item=>item.doktoraOncesimi).map(item=>
                                    (<tr>
                                        <td>{item.bentName}</td>
                                        <td>{item.bentParentName}</td>
                                        <td>{item.kacKisi}</td>
                                        <td>{item.kacAdet}</td>
                                        <td>{item.point}</td>
                                        <td>{item.resultPoint}</td>
                                    </tr>))}
                                    {ulusalMakale.items.filter(item=>item.doktoraOncesimi).map(item=>
                                    (<tr>
                                        <td>{item.bentName}</td>
                                        <td>{item.bentParentName}</td>
                                        <td>{item.kacKisi}</td>
                                        <td>{item.kacAdet}</td>
                                        <td>{item.point}</td>
                                        <td>{item.resultPoint}</td>
                                    </tr>))}
                                    {atiflar.items.filter(item=>item.doktoraOncesimi).map(item=>
                                    (<tr>
                                        <td>{item.bentName}</td>
                                        <td>{item.bentParentName}</td>
                                        <td>{item.kacKisi}</td>
                                        <td>{item.kacAdet}</td>
                                        <td>{item.point}</td>
                                        <td>{item.resultPoint}</td>
                                    </tr>))}
                                    {lisansUstYayin.items.filter(item=>item.doktoraOncesimi).map(item=>
                                    (<tr>
                                        <td>{item.bentName}</td>
                                        <td>{item.bentParentName}</td>
                                        <td>{item.kacKisi}</td>
                                        <td>{item.kacAdet}</td>
                                        <td>{item.point}</td>
                                        <td>{item.resultPoint}</td>
                                    </tr>))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col md="12">
                        <div style={{ marginTop: "20px" }}>
                            <h3>Doktora Sonras??</h3>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Konu</th>
                                        <th>Ki??i</th>
                                        <th>Adet</th>
                                        <th>Puan</th>
                                        <th>Sonu??</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {uluslararasi.items.filter(item=>!item.doktoraOncesimi).map(item=>
                                    (<tr>
                                        <td>{item.bentName}</td>
                                        <td>{item.bentParentName}</td>
                                        <td>{item.kacKisi}</td>
                                        <td>{item.kacAdet}</td>
                                        <td>{item.point}</td>
                                        <td>{item.resultPoint}</td>
                                       
                                    </tr>))}
                                    {ulusalMakale.items.filter(item=>!item.doktoraOncesimi).map(item=>
                                    (<tr>
                                        <td>{item.bentName}</td>
                                        <td>{item.bentParentName}</td>
                                        <td>{item.kacKisi}</td>
                                        <td>{item.kacAdet}</td>
                                        <td>{item.point}</td>
                                        <td>{item.resultPoint}</td>
                                    </tr>))}
                                    {lisansUstYayin.items.filter(item=>!item.doktoraOncesimi).map(item=>
                                    (<tr>
                                        <td>{item.bentName}</td>
                                        <td>{item.bentParentName}</td>
                                        <td>{item.kacKisi}</td>
                                        <td>{item.kacAdet}</td>
                                        <td>{item.point}</td>
                                        <td>{item.resultPoint}</td>
                                        
                                    </tr>))}
                                   {atiflar.items.filter(item=>!item.doktoraOncesimi).map(item=>
                                    (<tr>
                                        <td>{item.bentName}</td>
                                        <td>{item.bentParentName}</td>
                                        <td>{item.kacKisi}</td>
                                        <td>{item.kacAdet}</td>
                                        <td>{item.point}</td>
                                        <td>{item.resultPoint}</td>
                                        
                                    </tr>))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col md="12">
                        <div style={{ marginTop: "20px" }}>
                            <h3>Toplam Hesaplama</h3>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Faaliyet T??r??</th>
                                        <th>Puan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {uluslararasi.sum ? (<tr>
                                        <td>Uluslararas?? Makale</td>
                                        <td>{uluslararasi.sum>uluslararasi.maxPoint ? uluslararasi.maxPoint:uluslararasi.sum}</td>
                                    </tr>):''}
                                    {ulusalMakale.sum ? (<tr>
                                        <td>Ulusal Makale</td>
                                        <td>{ulusalMakale.sum>ulusalMakale.maxPoint ? ulusalMakale.maxPoint:ulusalMakale.sum}</td>
                                    </tr>):''}
                                    {lisansUstYayin.sum ? (<tr>
                                        <td>Lisans??st?? Tezlerden ??retilmi?? Yay??n</td>
                                        <td>{lisansUstYayin.sum>lisansUstYayin.maxPoint ? lisansUstYayin.maxPoint:lisansUstYayin.sum}</td>
                                    </tr>):''}
                                    {atiflar.sum ? (<tr>
                                        <td>At??flar</td>
                                        <td>{atiflar.sum>atiflar.maxPoint ? atiflar.maxPoint:atiflar.sum}</td>
                                    </tr>):''}
                                    <tr>
                                        <td>Doktora ??ncesi</td>
                                        <td>{lisansUstYayin.sumDoktoraOncesi+
                                        atiflar.sumDoktoraOncesi+uluslararasi.sumDoktoraOncesi+ulusalMakale.sumDoktoraOncesi}</td>
                                    </tr>
                                    <tr>
                                        <td>Doktora Sonras??</td>
                                        <td>{lisansUstYayin.sumDoktoraSonrasi+atiflar.sumDoktoraSonrasi+uluslararasi.sumDoktoraSonrasi
                                        +ulusalMakale.sumDoktoraSonrasi}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Genel Toplam</b></td>
                                        <td>{lisansUstYayin.sum+atiflar.sum+uluslararasi.sum+ulusalMakale.sum}</td>
                                    </tr>
                                    <tr>
                                        <td><b>De??erlendirme</b></td>
                                        <td>{basvurabilirMi ? (<span style={{ color: "green", fontWeight: "bold" }}>Ba??vurabilir</span>) : (<span style={{ color: "red", fontWeight: "bold" }}>Ba??vuramaz</span>)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Se??enekler</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={e => { handleSubmit(e) }}>
                        <input type="hidden" name="bentPoint" value={clickedProps.clickedBentPoint}></input>
                        <input type="hidden" name="bentName" value={clickedProps.clickedBentName}></input>
                        <input type="hidden" name="bentParentName" value={clickedProps.clickedBentParentName}></input>

                        <input type="hidden" name="bentMaxPoint" value={clickedProps.clickedBentMaxPoint}></input>

                        <Form.Group>
                            <Form.Label>Doktora ??ncesi/sonras???</Form.Label>
                            <Form.Control as="select" onChange={e => setOncemiSonrami(e.target.value)}>
                                <option value="1">Doktora ??ncesi</option>
                                <option value="0">Doktora Sonras??</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ka?? ki??i yap??ld???</Form.Label>
                            <Form.Control as="select" onChange={e => setKacKisi(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ka?? adet ?</Form.Label>
                            <Form.Control as="select" onChange={e => setKacAdet(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Kaydet
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EgitimBilimleri
