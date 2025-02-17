data = {
	'Instructing_Agent': 'JSBLPKKA',
	'Instructed_Agent': 'HSBCPKKX',
	'Message_Reference': 'JSBLPKKA202003',
	'Message_Creation_Timestamp': '2019-09-29T09:02:01+05:00',
	'Payment_Priority': '0020',
	'Transaction_Reference': 'eda44485-9f17-451c-afc0-4456d7b7e6da',
	'Settlement_Amount': 2000.50,
	'Settlement_Date': '2019-09-29',
	'Charges_bearer': 'SHAR',
    'Debtor_Agent': 'JSBLPKKA',	
    'Debtor_Client': 'PREVPKK0',
    'Debtor_Client_Account': '1356789024',
	'Creditor_Agent': 'HSBCPKKX',
    'Creditor_Client_Account': '01206300018',
}

# Instructing agent will always be a sender and a debitor i.e from 
# Instructed agent will always be a receiver and a creditor i.e to

message = f'''
<?xml version="1.0" encoding="UTF-8"?>
<DataPDU xmlns="urn:cma:stp:xsd:stp.1.0">
	<Body>
		<!-- Application header -->
		<AppHdr xmlns="urn:iso:std:iso:20022:tech:xsd:head.001.001.02">
			<!-- Message Sender -->
			<Fr>
				<FIId>
					<FinInstnId>
						<BICFI>{data['Instructing_Agent']}</BICFI>
					</FinInstnId>
				</FIId>
			</Fr>
			<!-- Message Receiver -->
			<To>
				<FIId>
					<FinInstnId>
						<BICFI>{data['Instructed_Agent']}</BICFI>
					</FinInstnId>
				</FIId>
			</To>
			<!-- Message Reference -->
			<BizMsgIdr>{data['Message_Reference']}</BizMsgIdr>
			<!-- Message Type -->
			<MsgDefIdr>pacs.009.001.08</MsgDefIdr>
			<!-- Business Service -->
			<BizSvc>sbp.rtgs.01</BizSvc>
			<!-- Message Creation Date/Time-->
			<CreDt>{data['Message_Creation_Timestamp']}</CreDt>
			<!--Payment priority -->
			<Prty>{data['Payment_Priority']}</Prty>
		</AppHdr>
		<!-- Document -->
		<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.009.001.08">
			<FICdtTrf>
				<GrpHdr>
					<!--Unique message reference as generated by sending party.-->
					<MsgId>{data['Message_Reference']}</MsgId>
					<!--Document creation date-time -->
					<CreDtTm>{data['Message_Creation_Timestamp']}</CreDtTm>
					<!--Number of payment instructions. Fixed value = 1 -->
					<NbOfTxs>1</NbOfTxs>
					<!--Fixed value CLRG -->
					<SttlmInf>
						<SttlmMtd>CLRG</SttlmMtd>
					</SttlmInf>
				</GrpHdr>
				<CdtTrfTxInf>
					<PmtId>
						<!-- Unique Instruction reference as generated by sending party. The same as MsgId in this message version -->
						<InstrId>{data['Message_Reference']}</InstrId>
						<!-- End-to-End reference. Not verified for uniqueness. Equivalent of field :21:  NOTPROVIDED in case NONREF-->
						<EndToEndId>NOTPROVIDED</EndToEndId>
						<!-- Unique transaction reference as generated by sending party. The same as MsgId in this message version -->
						<TxId>{data['Message_Reference']}</TxId>
						<!--UETR -->
						<UETR>{data['Transaction_Reference']}</UETR>
					</PmtId>
					<PmtTpInf>
						<!--Local instrument code identifying business process of the payment. Fixed value -->
						<LclInstrm>
							<Prtry>RTGS-FICT</Prtry>
						</LclInstrm>
					</PmtTpInf>
					<!--Payment amount and currency code -->
					<IntrBkSttlmAmt Ccy="PKR">{data['Settlement_Amount']}</IntrBkSttlmAmt>
					<!--Requested payment settlement date -->
					<IntrBkSttlmDt>{data['Settlement_Date']}</IntrBkSttlmDt>
					<!--Instructing agent. Participant who is debited in PRISM. BICFI for SWIFT-registered BIC.  
                    ClrSysMmbId/MmbId for pseudo-BIC code (non-SWIFT registered)-->
					<InstgAgt>
						<FinInstnId>
							<BICFI>{data['Instructing_Agent']}</BICFI>
						</FinInstnId>
					</InstgAgt>
					<!--Instructed agent. Participant who is credited in PRISM. BICFI for SWIFT-registered BIC.  
                    ClrSysMmbId/MmbId for pseudo-BIC code (non-SWIFT registered)-->
					<InstdAgt>
						<FinInstnId>
							<BICFI>{data['Instructed_Agent']}</BICFI>
						</FinInstnId>
					</InstdAgt>
                    
					<!-- Debtor Agent. Participant in Field 53a in current version of MT202. 
                    BICFI for SWIFT-registered participants. ClrSysMmbId/MmbId for pseudo-BIC code (non-SWIFT registered)-->
					<DbtrAgt>
						<FinInstnId>
							<BICFI>{data['Debtor_Agent']}</BICFI>
						</FinInstnId>
					</DbtrAgt>
                    <!--Debtor. Participant in Field 53a of MT202. BICFI for SWIFT-registered participants. 
                    ClrSysMmbId/MmbId for pseudo-BIC code (non-SWIFT registered)-->
					<Dbtr>
						<FinInstnId>
							<BICFI>{data['Debtor_Client']}</BICFI>
						</FinInstnId>
					</Dbtr>
                    <!--Debtor account.  -->
					<DbtrAcct>
						<Id>
							<Othr>
								<Id>{data['Debtor_Client_Account']}</Id>
							</Othr>
						</Id>
					</DbtrAcct>
					
					<!-- Creditor. Participant in Field 58a of MT202.  BICFI for SWIFT-registered participants. 
                    ClrSysMmbId/MmbId for pseudo-BIC code (non-SWIFT registered). The same participant as Debtor in case of cash reservation -->
					<Cdtr>
						<FinInstnId>
							<BICFI>{data['Creditor_Agent']}</BICFI>
						</FinInstnId>
					</Cdtr>
					<!--Creditor account. Account of participant to be credited in PRISM. -->
					<CdtrAcct>
						<Id>
							<Othr>
								<Id>{data['Creditor_Client_Account']}</Id>
							</Othr>
						</Id>
					</CdtrAcct>
				</CdtTrfTxInf>
			</FICdtTrf>
		</Document>
	</Body>
</DataPDU>
'''

draft_by_sbp = '''
<?xml version="1.0" encoding="UTF-8"?>
<DataPDU xmlns="urn:cma:stp:xsd:stp.1.0">
	<Body>
		<!-- Application header -->
		<AppHdr xmlns="urn:iso:std:iso:20022:tech:xsd:head.001.001.02">
			<!-- Message Sender -->
			<Fr>
				<FIId>
					<FinInstnId>
						<BICFI>JSBLPKKA</BICFI>
					</FinInstnId>
				</FIId>
			</Fr>
			<!-- Message Receiver -->
			<To>
				<FIId>
					<FinInstnId>
						<BICFI>HSBCPKKX</BICFI>
					</FinInstnId>
				</FIId>
			</To>
			<!-- Message Reference -->
			<BizMsgIdr>JSBLPKKA202003</BizMsgIdr>
			<!-- Message Type -->
			<MsgDefIdr>pacs.009.001.08</MsgDefIdr>
			<!-- Business Service -->
			<BizSvc>sbp.rtgs.01</BizSvc>
			<!-- Message Creation Date/Time-->
			<CreDt>2019-09-29T13:01:20+05:00</CreDt>
			<!--Payment priority -->
			<Prty>0020</Prty>
		</AppHdr>
		<!-- Document -->
		<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.009.001.08">
			<FICdtTrf>
				<GrpHdr>
					<!--Unique message reference as generated by sending party.-->
					<MsgId>JSBLPKKA202003</MsgId>
					<!--Document creation date-time -->
					<CreDtTm>2019-09-29T13:01:20+05:00</CreDtTm>
					<!--Number of payment instructions. Fixed value = 1 -->
					<NbOfTxs>1</NbOfTxs>
					<!--Fixed value CLRG -->
					<SttlmInf>
						<SttlmMtd>CLRG</SttlmMtd>
					</SttlmInf>
				</GrpHdr>
				<CdtTrfTxInf>
					<PmtId>
<!-- Unique Instruction reference as generated by sending party. The same as MsgId in this message version -->
						<InstrId>JSBLPKKA202003</InstrId>
<!-- End-to-End reference. Not verified for uniqueness. Equivalent of field :21:  NOTPROVIDED in case NONREF-->
						<EndToEndId>NOTPROVIDED</EndToEndId>
<!-- Unique transaction reference as generated by sending party. The same as MsgId in this message version -->
						<TxId>JSBLPKKA202003</TxId>
						<!--UETR -->
						<UETR>eda44485-9f17-451c-afc0-4456d7b7e6da</UETR>
					</PmtId>
					<PmtTpInf>
						<!--Local instrument code identifying business process of the payment. Fixed value -->
						<LclInstrm>
							<Prtry>RTGS-FICT</Prtry>
						</LclInstrm>
					</PmtTpInf>
					<!--Payment amount and currency code -->
					<IntrBkSttlmAmt Ccy="PKR">2000.50</IntrBkSttlmAmt>
					<!--Requested payment settlement date -->
					<IntrBkSttlmDt>2019-09-29</IntrBkSttlmDt>
					<!--Instructing agent. Participant who is debited in PRISM. BICFI for SWIFT-registered BIC.  ClrSysMmbId/MmbId for pseudo-BIC code (non-SWIFT registered)-->
					<InstgAgt>
						<FinInstnId>
							<BICFI>JSBLPKKA</BICFI>
						</FinInstnId>
					</InstgAgt>
					<!--Instructed agent. Participant who is credited in PRISM. BICFI for SWIFT-registered BIC.  ClrSysMmbId/MmbId for pseudo-BIC code (non-SWIFT registered)-->
					<InstdAgt>
						<FinInstnId>
							<BICFI>HSBCPKKX</BICFI>
						</FinInstnId>
					</InstdAgt>
					<!--Debtor. Participant in Field 53a of MT202. BICFI for SWIFT-registered participants. ClrSysMmbId/MmbId for pseudo-BIC code (non-SWIFT registered)-->
					<Dbtr>
						<FinInstnId>
							<BICFI>PREVPKK0</BICFI>
						</FinInstnId>
					</Dbtr>
					<!--Debtor account.  -->
					<DbtrAcct>
						<Id>
							<Othr>
								<Id>1356789024</Id>
							</Othr>
						</Id>
					</DbtrAcct>
					<!-- Debtor Agent. Participant in Field 53a in current version of MT202. BICFI for SWIFT-registered participants. ClrSysMmbId/MmbId for pseudo-BIC code (non-SWIFT registered)-->
					<DbtrAgt>
						<FinInstnId>
							<BICFI>JSBLPKKA</BICFI>
						</FinInstnId>
					</DbtrAgt>
					<!-- Creditor. Participant in Field 58a of MT202.  BICFI for SWIFT-registered participants. ClrSysMmbId/MmbId for pseudo-BIC code (non-SWIFT registered). The same participant as Debtor in case of cash reservation -->
					<Cdtr>
						<FinInstnId>
							<BICFI>HSBCPKKX</BICFI>
						</FinInstnId>
					</Cdtr>
					<!--Creditor account. Account of participant to be credited in PRISM. -->
					<CdtrAcct>
						<Id>
							<Othr>
								<Id>01206300018</Id>
							</Othr>
						</Id>
					</CdtrAcct>
					<!--Additional information about payment -->
					<InstrForNxtAgt>
						<InstrInf>/ACC/Test</InstrInf>
					</InstrForNxtAgt>
					<InstrForNxtAgt>
						<InstrInf>//Continuation</InstrInf>
					</InstrForNxtAgt>
					<!--Transaction type code as per defined in system dictionary of TTCs. -->
					<Purp>
						<Prtry>001</Prtry>
					</Purp>
				</CdtTrfTxInf>
			</FICdtTrf>
		</Document>
	</Body>
</DataPDU>
'''