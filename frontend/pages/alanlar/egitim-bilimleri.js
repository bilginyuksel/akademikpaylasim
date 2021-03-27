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
            //burada interfacelerden yararlan. nesne dayalı progralama yap...

        if(clickedProps.clickedBentParentName=="Atıflar"){
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
                            <h1>Başvuru Şartları</h1>
                            <p>
                                Eğitim bilimleri temel alanında başvurulan doçentlik bilim alanı ile ilgili olarak aşağıdaki
                                çalışmalara verilen birim puanlar esas alınmak suretiyle; en az doksan (90) puanının
                                doktora unvanının alınmasından sonra gerçekleştirilen çalışmalardan elde edilmiş
                                olması kaydıyla, asgari yüz (100) puan karşılığı bilimsel etkinlikte bulunmuş olması
                                gerekir. Her çalışma Tablo 1' de sadece bir bölümde yazılarak puanlandırılır.
                        </p>
                            <p>
                                Tek yazarlı yayınlarda yazar tam puan alır. Çok yazarlı yayınlarda puan yazarlar arasında
                                eşit olarak bölünür.
                        </p>
                        </Jumbotron>
                    </Col>
                    <Col md="12">
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        1. Uluslararası Makale
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <p>
                                            Başvurulan doçentlik bilim alanı ile ilgili ve adayın hazırladığı lisansüstü tezlerden
                                            üretilmemiş olmak kaydıyla
                                    </p>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Faaliyet</th>
                                                    <th>Puan</th>
                                                    <th>İşlemler</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               <Bent />
                                            </tbody>
                                        </Table>
                                        <p>
                                            <i>Bu maddenin a veya b bentleri kapsamında <b>en az 20 puan</b> almak zorunludur.</i>
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
                                            Başvurulan doçentlik bilim alanı ile ilgili ve adayın yaptığı lisansüstü tezlerden
                                            üretilmemiş olmak kaydıyla
                                    </p>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Faaliyet</th>
                                                    <th>Puan</th>
                                                    <th>İşlemler</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>a</td>
                                                    <td>ULAKBİM tarafından taranan ulusal hakemli dergilerde yayımlanmış
makale</td>
                                                    <td>8</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(8, '2-a', 'Ulusal Makale', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>b</td>
                                                    <td>a bendi dışındaki ulusal hakemli dergilerde yayımlanmış makale</td>
                                                    <td>4</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(4, '2-b', 'Ulusal Makale', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <p>
                                            <i>İkisi bu maddenin a bendi kapsamında olmak üzere <b>en az üç yayın</b> yapmak
zorunludur.Yabancı uyruklu adaylar ile yurtdışı doçentlik denkliği başvurusu yapan
adaylar , ULAKBİM tarafından taranan ulusal hakemli dergilerde yayımlanmış makale
şartını sağlayamamaları durumunda, bunun yerine aynı sayıdaki yayını 1.maddenin a
ve/veya b bentleri kapsamında sağlayacaklardır.</i>
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                        3. Lisansüstü Tezlerden Üretilmiş Yayın
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        <p>
                                            Adayın hazırladığı lisansüstü tezleriyle ilgili olmak kaydıyla
                                    </p>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Faaliyet</th>
                                                    <th>Puan</th>
                                                    <th>İşlemler</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>a</td>
                                                    <td>Uluslararası yayınevleri tarafından yayımlanmış kitap </td>
                                                    <td>10</td>
                                                    <td><Button variant="primary" onClick={() => handleShow(10, '3-a', 'Lisansüstü Tezlerden Üretilmiş Yayın', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>b</td>
                                                    <td>Uluslararası yayınevleri tarafından yayımlanmış kitapta bölüm</td>
                                                    <td>8</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(8, '3-b', 'Lisansüstü Tezlerden Üretilmiş Yayın', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>c</td>
                                                    <td>Ulusal yayınevleri tarafından yayımlanmış kitap </td>
                                                    <td>5</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(5, '3-c', 'Lisansüstü Tezlerden Üretilmiş Yayın', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>d</td>
                                                    <td>Ulusal yayınevleri tarafından yayımlanmış kitapta bölüm</td>
                                                    <td>4</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(4, '3-d', 'Lisansüstü Tezlerden Üretilmiş Yayın', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>e</td>
                                                    <td> SSCI, SCI, SCI-Expanded ve AHCI kapsamındaki dergilerde yayımlanmış
makale</td>
                                                    <td>8</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(8, '3-e', 'Lisansüstü Tezlerden Üretilmiş Yayın', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>f</td>
                                                    <td>Uluslararası alan endekslerinde taranan dergilerde yayımlanmış makale</td>
                                                    <td>6</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(6, '3-f', 'Lisansüstü Tezlerden Üretilmiş Yayın', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>g</td>
                                                    <td> ULAKBİM tarafından taranan dergilerde yayımlanmış makale</td>
                                                    <td>4</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(4, '3-g', 'Lisansüstü Tezlerden Üretilmiş Yayın', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <p>
                                            <i>Bu madde kapsamında <b>en az 1 yayın</b> zorunludur. Bu maddeden <b>en fazla 10 puan </b>
 alınabilir</i>
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
                                        <p>Adayın hazırladığı lisansüstü tezlerinden üretilmemiş ve başvurulan doçentlik bilim alanı
ile ilgili olmak kaydıyla</p>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Faaliyet</th>
                                                    <th>Puan</th>
                                                    <th>İşlemler</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>a</td>
                                                    <td>Uluslararası yayınevleri tarafından yayımlanmış kitap</td>
                                                    <td>20</td>
                                                    <td><Button variant="primary" onClick={() => handleShow(20, '4-a', 'Kitap', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>b</td>
                                                    <td>Uluslararası yayınevleri tarafından yayımlanmış kitap editörlüğü veya
bölüm yazarlığı</td>
                                                    <td>10</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(10, '4-b', 'Kitap', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>c</td>
                                                    <td>Ulusal yayınevleri tarafından yayımlanmış kitap</td>
                                                    <td>15</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(15, '4-c', 'Kitap', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>d</td>
                                                    <td> Ulusal yayınevleri tarafından yayımlanmış kitap editörlüğü veya bölüm
yazarlığı</td>
                                                    <td>8</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(8, '4-d', 'Kitap', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <p>
                                            <i>Bu madde kapsamında sadece ders kitabı niteliği dışındaki özgün bilimsel kitaplar
puanlanabilir, aynı kitaptaki bölümlerden en fazla ikisi dikkate alınır. Alana özgü
ansiklopedi maddelerinin üç veya daha çok maddesi bir kitap bölümü kabul edilir</i>
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="4">
                                        5. Atıflar
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
                                                    <th>İşlemler</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>a</td>
                                                    <td>SCI, SCI-Expanded, SSCI ve AHCI tarafından taranan dergilerde;
Uluslararası yayınevleri tarafından yayımlanmış kitaplarda yayımlanan ve
adayın yazar olarak yer almadığı yayınlardan her birinde, metin içindeki
atıf sayısına bakılmaksızın adayın atıf yapılan her eseri için</td>
                                                    <td>3</td>
                                                    <td><Button variant="primary" onClick={() => handleShow(3, '5-a', 'Atıflar', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>b</td>
                                                    <td>SCI, SCI-Expanded, SSCI ve AHCI dışındaki endeksler tarafından taranan
dergilerde; Uluslararası yayınevleri tarafından yayımlanmış kitaplarda
bölüm yazarı olarak yayımlanan ve adayın yazar olarak yer almadığı
yayınlardan her birinde, metin içindeki atıf sayısına bakılmaksızın adayın
atıf yapılan her eseri için
</td>
                                                    <td>2</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(2, '5-b', 'Atıflar', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>c</td>
                                                    <td>Ulusal hakemli dergilerde; Ulusal yayınevleri tarafından yayımlanmış
kitaplarda yayımlanan ve adayın yazar olarak yer almadığı yayınlardan her
birinde, metin içindeki atıf sayısına bakılmaksızın adayın atıf yapılan her
eseri için</td>
                                                    <td>1</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(1, '5-c', 'Atıflar', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <p>
                                            <i>Bu madde kapsamında <b>en az 4</b> puan alınması zorunludur.Bu madde kapsamında <b>en
fazla 20 puan</b> alınabilir</i>
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="5">
                                        6. Lisansüstü Tez Danışmanlığı
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="5">
                                <Card.Body>
                                    <p>Adayın danışmanlığını yürüttüğü tamamlanan lisansüstü tezlerden</p>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Faaliyet</th>
                                                    <th>Puan</th>
                                                    <th>İşlemler</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>a</td>
                                                    <td>Doktora tez danışmanlığı</td>
                                                    <td>4</td>
                                                    <td><Button variant="primary" onClick={() => handleShow(4, '6-a', 'Lisansüstü Tez Danışmanlığı', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                <tr>
                                                    <td>b</td>
                                                    <td>Yüksek lisans tez danışmanlığı</td>
                                                    <td>2</td>
                                                    <td> <Button variant="primary" onClick={() => handleShow(2, '5-b', 'Atıflar', 0)}>Ekle</Button>{' '} </td>
                                                </tr>
                                                
                                            </tbody>
                                        </Table>
                                        <p>
                                            <i>
                                            Bu madde kapsamında <b>en fazla 10 </b> puan alınabilir. İkinci/eş danışman olması
durumunda asıl danışman a ve b bentleri için öngörülen puanların tamamını, ikinci
danışman ise yarısını alır.
                                            </i>
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="6">
                                        7. Bilimsel Araştırma Projesi
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="6">
                                    <Card.Body>Hello! I'm another body</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="7">
                                        8. Bilimsel Toplantı Faaliyeti (Başvurulan bilim alanı ile ilgili ve adayın hazırladığı
                                        lisansüstü tezlerden üretilmemiş olmak kaydıyla)
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="7">
                                    <Card.Body>Hello! I'm another body</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="8">
                                        9. Eğitim-Öğretim Faaliyeti
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
                            <h3>Doktora Öncesi</h3>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Konu</th>
                                        <th>Kişi</th>
                                        <th>Adet</th>
                                        <th>Puan</th>
                                        <th>Sonuç</th>
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
                            <h3>Doktora Sonrası</h3>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Konu</th>
                                        <th>Kişi</th>
                                        <th>Adet</th>
                                        <th>Puan</th>
                                        <th>Sonuç</th>
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
                                        <th>Faaliyet Türü</th>
                                        <th>Puan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {uluslararasi.sum ? (<tr>
                                        <td>Uluslararası Makale</td>
                                        <td>{uluslararasi.sum>uluslararasi.maxPoint ? uluslararasi.maxPoint:uluslararasi.sum}</td>
                                    </tr>):''}
                                    {ulusalMakale.sum ? (<tr>
                                        <td>Ulusal Makale</td>
                                        <td>{ulusalMakale.sum>ulusalMakale.maxPoint ? ulusalMakale.maxPoint:ulusalMakale.sum}</td>
                                    </tr>):''}
                                    {lisansUstYayin.sum ? (<tr>
                                        <td>Lisansüstü Tezlerden Üretilmiş Yayın</td>
                                        <td>{lisansUstYayin.sum>lisansUstYayin.maxPoint ? lisansUstYayin.maxPoint:lisansUstYayin.sum}</td>
                                    </tr>):''}
                                    {atiflar.sum ? (<tr>
                                        <td>Atıflar</td>
                                        <td>{atiflar.sum>atiflar.maxPoint ? atiflar.maxPoint:atiflar.sum}</td>
                                    </tr>):''}
                                    <tr>
                                        <td>Doktora Öncesi</td>
                                        <td>{lisansUstYayin.sumDoktoraOncesi+
                                        atiflar.sumDoktoraOncesi+uluslararasi.sumDoktoraOncesi+ulusalMakale.sumDoktoraOncesi}</td>
                                    </tr>
                                    <tr>
                                        <td>Doktora Sonrası</td>
                                        <td>{lisansUstYayin.sumDoktoraSonrasi+atiflar.sumDoktoraSonrasi+uluslararasi.sumDoktoraSonrasi
                                        +ulusalMakale.sumDoktoraSonrasi}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Genel Toplam</b></td>
                                        <td>{lisansUstYayin.sum+atiflar.sum+uluslararasi.sum+ulusalMakale.sum}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Değerlendirme</b></td>
                                        <td>{basvurabilirMi ? (<span style={{ color: "green", fontWeight: "bold" }}>Başvurabilir</span>) : (<span style={{ color: "red", fontWeight: "bold" }}>Başvuramaz</span>)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Seçenekler</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={e => { handleSubmit(e) }}>
                        <input type="hidden" name="bentPoint" value={clickedProps.clickedBentPoint}></input>
                        <input type="hidden" name="bentName" value={clickedProps.clickedBentName}></input>
                        <input type="hidden" name="bentParentName" value={clickedProps.clickedBentParentName}></input>

                        <input type="hidden" name="bentMaxPoint" value={clickedProps.clickedBentMaxPoint}></input>

                        <Form.Group>
                            <Form.Label>Doktora öncesi/sonrası?</Form.Label>
                            <Form.Control as="select" onChange={e => setOncemiSonrami(e.target.value)}>
                                <option value="1">Doktora Öncesi</option>
                                <option value="0">Doktora Sonrası</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Kaç kişi yapıldı?</Form.Label>
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
                            <Form.Label>Kaç adet ?</Form.Label>
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
