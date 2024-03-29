package com.bombit;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;


public class Server {
	
	private int port;
	private Thread listenThread;
	private boolean listening = false;
	private DatagramSocket socket;
	private int spawn = 0;
	private boolean started = false;
	
	private final int MAX_PACKET_SIZE = 1024;
	private byte[] recivedDataBuffer = new byte[MAX_PACKET_SIZE * 10];
	
	private List<ServerClient> clients = new ArrayList<ServerClient>();
	
	public Server(int port){
		this.port = port;
	}
	
	public void start(){
		try {
			socket = new DatagramSocket(port);
		} catch (SocketException e) {
			e.printStackTrace();
			return;
		}
		
		System.out.println("Server started on port 8192");
		
		listening = true;
		
		listenThread = new Thread(() -> listen(), "listen");
		listenThread.start();
		System.out.println("Server is listening...");
	}
	
	private void listen(){
		while(listening){
			DatagramPacket packet = new DatagramPacket(recivedDataBuffer, MAX_PACKET_SIZE);
			try {
				socket.receive(packet);
			} catch (IOException e) {
				e.printStackTrace();
			}
			process(packet);
		}
	}
	
	
	private void process(DatagramPacket packet){
		byte[] data = packet.getData();
		InetAddress address = packet.getAddress();
		int port = packet.getPort();
		
		if (data[0] == 0x40 && data[1] == 0x40){
			switch(data[2]){
				case 0x01:
					clients.add(new ServerClient(packet.getAddress(), packet.getPort()));
					int x = 0;
					int y = 0;
					if(spawn == 0) {
						x = 24;
						y = 16;
					}else if(spawn == 1) {
						x = 264;
						y = 256;
					}else if(spawn == 2) {
						x = 24;
						y = 256;
					}else if(spawn == 3) {
						x = 264;
						y = 16;
					}
					
					byte[] send = new byte[128];
					byte[] userID = getBynaryFtomInt(clients.get(clients.size() - 1).userID);
					byte[] xSpawn = getBynaryFtomInt(x);
					byte[] ySpawn = getBynaryFtomInt(y);
					
					for(int i = 0; i < 4; i++){
						send[i] = userID[i];
						send[i + 4] = xSpawn[i];
						send[i + 8] = ySpawn[i];
					}
					
					send(send , clients.get(clients.size() - 1).address, clients.get(clients.size() - 1).port);
					
					spawn++;
					if(spawn == 4) {
						started = true;
						spawn = 0;
					}
					
			}
		}else{
			for(int i = 0; i < clients.size(); i++){
				if(clients.get(i).userID == ByteBuffer.wrap(data, 0, 4).getInt()){
					clients.get(i).setXY(ByteBuffer.wrap(data, 4, 4).getInt(), ByteBuffer.wrap(data, 8, 4).getInt(), ByteBuffer.wrap(data, 12, 4).getInt(), ByteBuffer.wrap(data, 16, 4).getInt());
				}
			}
			sendAllToAll();
		}
	}

	private void sendAllToAll() {
		int counter = 0;
		for(int i = 0; i < clients.size(); i++){
			byte[] data = new byte[MAX_PACKET_SIZE];
			BinaryWriter writer = new BinaryWriter();
			byte[] add = "NEW".getBytes();
			writer.write(add);
			writer.write(clients.size() - 1);
			for(int j = 0; j < clients.size(); j++){
				if(j != counter){
					writer.write(clients.get(j).x);
					writer.write(clients.get(j).y);
					writer.write(clients.get(j).sprite);
					writer.write(clients.get(j).bomb);
				}
			}
			data = writer.getBuffer();
			send(data, clients.get(i).address, clients.get(i).port);	
			counter++;
		}
	}

	private byte[] getBynaryFtomInt(int num) {
		byte[] data = new byte[4];
		data[0] = (byte)((num >> 24) & 0xff);
		data[1] = (byte)((num >> 16) & 0xff);
		data[2] = (byte)((num >> 8) & 0xff);
		data[3] = (byte)((num >> 0) & 0xff);
		return data;
	}

	public void send(byte[] data, InetAddress address, int port){
		assert(socket.isConnected());
		DatagramPacket packet = new DatagramPacket(data, data.length, address, port);
		try {
			socket.send(packet);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
