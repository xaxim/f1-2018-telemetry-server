const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (buf, rinfo) => {
    //console.log(`${new Date()}: server got ${buf.length} bytes from ${rinfo.address}:${rinfo.port}`);
    //     struct PacketHeader
    // {
    //     uint16    m_packetFormat;         // 2018
    //     uint8     m_packetVersion;        // Version of this packet type, all start from 1
    //     uint8     m_packetId;             // Identifier for the packet type, see below
    //     uint64    m_sessionUID;           // Unique identifier for the session
    //     float     m_sessionTime;          // Session timestamp
    //     uint      m_frameIdentifier;      // Identifier for the frame the data was retrieved on
    //     uint8     m_playerCarIndex;       // Index of player's car in the array
    // };
    const headerSize = 21;
    const m_packetId = buf.readUInt8(3).toString();
    if (m_packetId == 0 && buf.length == 1341) {
        console.log("Motion");
    } else if (m_packetId == 1 && buf.length == 147) {
        console.log("Session");
    } else if (m_packetId == 2 && buf.length == 841) {
        console.log("Lap Data");
    } else if (m_packetId == 3 && buf.length == 25) {
        console.log("Event");
    } else if (m_packetId == 4 && buf.length == 1082) {
        console.log("Participants");
    } else if (m_packetId == 5 && buf.length == 841) {
        console.log("Car Setups");
    } else if (m_packetId == 6 && buf.length == 1085) {
        console.log("Car Telemetry");
        /*
        struct CarTelemetryData
{
    uint16    m_speed;                      // Speed of car in kilometres per hour
    uint8     m_throttle;                   // Amount of throttle applied (0 to 100)
    int8      m_steer;                      // Steering (-100 (full lock left) to 100 (full lock right))
    uint8     m_brake;                      // Amount of brake applied (0 to 100)
    uint8     m_clutch;                     // Amount of clutch applied (0 to 100)
    int8      m_gear;                       // Gear selected (1-8, N=0, R=-1)
    uint16    m_engineRPM;                  // Engine RPM
    uint8     m_drs;                        // 0 = off, 1 = on
    uint8     m_revLightsPercent;           // Rev lights indicator (percentage)
    uint16    m_brakesTemperature[4];       // Brakes temperature (celsius)
    uint16    m_tyresSurfaceTemperature[4]; // Tyres surface temperature (celsius)
    uint16    m_tyresInnerTemperature[4];   // Tyres inner temperature (celsius)
    uint16    m_engineTemperature;          // Engine temperature (celsius)
    float     m_tyresPressure[4];           // Tyres pressure (PSI)
};
        */
       console.log(`m_speed:  ${buf.readUInt16LE(21).toString()}`);
       console.log(`m_throttle:  ${buf.readUInt8(23).toString()}`);
       console.log(`m_steer:  ${buf.readInt8(24).toString()}`);
       console.log(`m_brake:  ${buf.readUInt8(25).toString()}`);
       console.log(`m_clutch:  ${buf.readUInt8(26).toString()}`);
       console.log(`m_gear:  ${buf.readInt8(27).toString()}`);
       console.log(`m_engineRPM:  ${buf.readUInt16LE(28).toString()}`);
       console.log(`m_drs:  ${buf.readUInt8(30).toString()}`);
    } else if (m_packetId == 7 && buf.length == 1061) {
        console.log("Car Status");
    } else {
        console.error("Unknown message type received");
    }
    // console.log("Packet Header:");
    // console.log(`m_packetFormat:  ${buf.readUInt16LE(0).toString()}`);
    // console.log(`m_packetVersion: ${buf.readUInt8(2).toString()}`);
    // console.log(`m_packetId:      ${buf.readUInt8(3).toString()}`);
    // console.log(`m_sessionUID:    ${buf.readUInt32LE(4).toString()}${buf.readUInt32LE(8).toString()}`);
    // console.log(`m_sessionTime:    ${buf.readFloatLE(12).toString()}`);
    // console.log(`m_frameIdentifier:    ${buf.readUInt32LE(16).toString()}`);
    // console.log(`m_playerCarIndex:    ${buf.readUInt8(20).toString()}`);
    // console.log('-----------');
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(20777);
// server listening 0.0.0.0:41234