package Client;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.RenderingHints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.Timer;
import javax.swing.UIManager;
import javax.swing.border.EmptyBorder;
import javax.swing.text.DefaultCaret;

public class ClientWindow extends JFrame implements Runnable, ActionListener, MouseListener{
	private static final long serialVersionUID = 1L;

	private JTextField txtMessage;
	private JPanel contentPane;
	private JTextArea history;
	private JScrollPane scroll;
	private DefaultCaret caret;
	private Thread listen, run;
	private Client client;
	private boolean running = false;
	private Renderer renderer;
	private static Timer timer;
	public  final static int WIDTH = 370;
	public final static int HEIGHT = 260;
	public int xpos,ypos;
	public boolean turn = false;
	public static boolean tie = false;
	public static boolean win = false;
	public static boolean over = false;
	public static boolean[] full = {false,false,false,false,false,false,false,false,false};
	public static boolean[] X = {false,false,false,false,false,false,false,false,false};
	public int[][] winpos = {
			{0,3,6},
			{0,1,2},
			{0,0,0},
			{2,2,2}
	};
	public static String ties = "It's a tie";
	public static String i = "You won";
	public static String opponent = "You lost";
	
	public ClientWindow(String name, String address, int port) {
		setTitle("Chat");
		client = new Client(name,address,port);
		boolean connect = client.openConnection(address);
		if(!connect){
			System.err.println("Connection failed!");
			console("Connection failed!");
		}
		createWindow();
		console("Attempting a connection to" + address + ":" + " user:" + name);
		String connection = "/c/" + name + "/e/"; 
		client.send(connection.getBytes());
		running = true;
		run = new Thread(this, "Running");
		run.start();
	}
	
	private void createWindow(){
		try{
			UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
		}catch(Exception e){
			e.printStackTrace();
		}
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setSize(680,340);
		setLocationRelativeTo(null);
		timer = new Timer(20,this);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		GridBagLayout gbl_contentPane = new GridBagLayout();
		gbl_contentPane.columnWidths = new int[]{5, 380, 250, 10 , 30, 5};
		gbl_contentPane.rowHeights = new int[]{5,300,35};
		contentPane.setLayout(gbl_contentPane);
		

		history = new JTextArea();
		history.setEditable(false);
		scroll = new  JScrollPane(history);
		caret = (DefaultCaret) history.getCaret();
		caret.setUpdatePolicy(DefaultCaret.ALWAYS_UPDATE);
		renderer = new Renderer();	
		renderer.addMouseListener(this);
		GridBagConstraints gbc_renderer = new GridBagConstraints();
		gbc_renderer.fill = GridBagConstraints.BOTH;
		gbc_renderer.insets = new Insets(0, 5, 0, 5);
		gbc_renderer.gridwidth = 1;
		gbc_renderer.gridx = 1;
		gbc_renderer.gridheight = 1;
		gbc_renderer.gridy = 1;
		contentPane.add(renderer, gbc_renderer);
		GridBagConstraints scrollConstraints = new GridBagConstraints();
		scrollConstraints.gridwidth = 3;
		scrollConstraints.insets = new Insets(0, 5, 5, 5);
		scrollConstraints.fill = GridBagConstraints.BOTH;
		scrollConstraints.gridx = 2;
		scrollConstraints.gridy = 1;
		scrollConstraints.weightx = 1;
		scrollConstraints.weighty = 1;
		scrollConstraints.insets = new Insets(0,5,0,0);
		contentPane.add(scroll, scrollConstraints);
		
		txtMessage = new JTextField();
		txtMessage.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if(e.getKeyCode() == KeyEvent.VK_ENTER){
					send(txtMessage.getText(), true);
				}
			}
		});
		GridBagConstraints gbc_txtMessage = new GridBagConstraints();
		gbc_txtMessage.insets = new Insets(0, 5, 0, 5);
		gbc_txtMessage.fill = GridBagConstraints.HORIZONTAL;
		gbc_txtMessage.gridx = 1;
		gbc_txtMessage.gridy = 2;
		gbc_txtMessage.gridwidth = 2;
		gbc_txtMessage.weightx = 1;
		gbc_txtMessage.weighty = 0;
		contentPane.add(txtMessage, gbc_txtMessage);
		txtMessage.setColumns(10);
		
		JButton btnSend = new JButton("Send");
		btnSend.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				send(txtMessage.getText(), true);
			}
		});
		GridBagConstraints gbc_btnSend = new GridBagConstraints();
		gbc_btnSend.insets = new Insets(0, 0, 0, 5);
		gbc_btnSend.gridx = 4;
		gbc_btnSend.gridy = 2;
		gbc_btnSend.weightx = 0;
		gbc_btnSend.weighty = 0;
		contentPane.add(btnSend, gbc_btnSend);
		
		addWindowListener(new WindowAdapter(){
			public void windowClosing(WindowEvent e){
				String disconect = "/d/" + client.getID() + "/e/";
				send(disconect, false);
				running = false;
				client.close();
			}
		}
		);
		
		setVisible(true);
		
		txtMessage.requestFocusInWindow();
		timer.start();
	}
	
	public void run() {
		listen();
	}
	

	private void send(String message, boolean text){
		if(message.equals("")) return;
		if(text){
			message = client.getName() + ": " + message;
			message = "/m/" + message + "/e/";
			txtMessage.setText("");
		}
		client.send(message.getBytes());
	}
	
	public void listen(){
		listen = new Thread("Listen"){
			public void run(){
				while(running){
					String message = client.receive();
					if(message.startsWith("/c/")){
						client.setID(Integer.parseInt(message.split("/c/|/e/")[1]));
						console("Successfully connected to the server! ID: "+client.getID());
					}else if(message.startsWith("/m/")){
						String text = message.substring(3);
						text = text.split("/e/")[0];
						console(text);
					}if(message.startsWith("/t/")){
						turn = true;
						console("It's your turn");
					}if(message.startsWith("/nt/")){
						turn = false;
					}if(message.startsWith("/ct/")){
						turn = !turn;
						if(turn){
						console("It's your turn");
						}else{
							console("It isn't your turn");
						}
					}if(message.startsWith("/move/")){
						int move = Integer.parseInt(message.substring(6,7));
						full[move] = true;
					}
				}
			}
		};
		listen.start();
	}
	
	public void console(String message){
		history.setFont(new Font("Ariel", 0, 10));
		history.append(message +"\n\r");
		history.setCaretPosition(history.getDocument().getLength());
	}

	public void actionPerformed(ActionEvent e) {
		renderer.repaint();
		win();
		if(!over){
			tie();
		}
	}
	private void tie() {
		for(boolean i : full){
			if(!i){
				return;
			}
		}
		tie = true;
	}

	private void win() {
		int plus = 0;
		for(int i=0;i<4;i++){
			if(i==0){
				plus = 1;
			}else if(i == 1){
				plus = 3;
			}else if(i== 2){
				plus = 4;
			}else {
				plus = 2;
			}
			for(int j = 0; j<3;j++){
				if(full[winpos[i][j]] == true){
					if(X[winpos[i][j]]){
						if(full[winpos[i][j]+plus] == true && X[winpos[i][j]+plus] == true&& 
								full[winpos[i][j]+(plus*2)] == true && X[winpos[i][j]+(plus*2)] == true){
									over = true;
									win = true;
						}
					}else{
						if(full[winpos[i][j]+plus] == true && X[winpos[i][j]+plus] == false&& 
								full[winpos[i][j]+(plus*2)] == true && X[winpos[i][j]+(plus*2)] == false){
									over = true;
									win = false;
						}
					}
				}
			}
		}
	}

	public static void repaint(Graphics2D g){
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,RenderingHints.VALUE_ANTIALIAS_ON);
		g.setColor(Color.WHITE);
		g.fillRect(0, 0, WIDTH, HEIGHT+10);
		g.setColor(Color.BLACK);
		g.setColor(Color.BLACK);
		g.setStroke(new BasicStroke(5f));
		g.drawLine(WIDTH/3, 0, WIDTH/3, HEIGHT);
		g.drawLine(WIDTH/3*2, 0, WIDTH/3*2, HEIGHT);
		g.drawLine(0, HEIGHT/3, WIDTH, HEIGHT/3);
		g.drawLine(0, HEIGHT/3*2, WIDTH, HEIGHT/3*2);
		for(int i = 0; i < 9;i++){
			if(full[i] == true){
				if(X[i]){
					g.setColor(Color.RED);
					g.setStroke(new BasicStroke(5f));
					g.drawLine((int)i/3*WIDTH/3+10,(int)i%3*HEIGHT/3+10, 
							(int)(1+i/3)*WIDTH/3-10,(int)(1+i%3)*HEIGHT/3-10);
					g.drawLine((int)(1+i/3)*WIDTH/3-10,(int)i%3*HEIGHT/3+10, 
							(int)i/3*WIDTH/3+10,(int)(1+i%3)*HEIGHT/3-10);
				}else{
					g.setColor(Color.BLUE);
					g.setStroke(new BasicStroke(5f));
					g.drawOval((int)i/3*WIDTH/3+10,(int)i%3*HEIGHT/3+10, WIDTH/3-20,
							HEIGHT/3-20);
				}
			}
		}

		if(over){
			if(win){
				g.setColor(Color.cyan.darker());
				g.setFont(new Font("Ariel",Font.BOLD,70));
				int swidth = g.getFontMetrics().stringWidth(i);
				g.drawString(i,WIDTH/2-swidth/2,HEIGHT/2);
				timer.stop();
			}else{
				g.setColor(Color.cyan.darker());
				g.setFont(new Font("Ariel",Font.BOLD,70));
				int swidth = g.getFontMetrics().stringWidth(opponent);
				g.drawString(opponent,WIDTH/2-swidth/2,HEIGHT/2);
				timer.stop();
			}
		}if(tie){
			g.setColor(Color.cyan.darker());
			g.setFont(new Font("Ariel",Font.BOLD,70));
			int swidth = g.getFontMetrics().stringWidth(ties);
			g.drawString(ties,WIDTH/2-swidth/2,HEIGHT/2);
			timer.stop();
		}
	}

	public void mouseClicked(MouseEvent e) {
		
	}

	public void mouseEntered(MouseEvent e) {
		
	}

	public void mouseExited(MouseEvent e) {
		
	}

	public void mousePressed(MouseEvent e) {
		
	}

	public void mouseReleased(MouseEvent e) {
		xpos = e.getX();
		ypos = e.getY();
		System.out.println(xpos + " " + ypos);
		if(turn){
			if(xpos < WIDTH / 3){
				if(ypos < HEIGHT / 3 && full[0] == false){
					full[0] = true;
					X[0] = true;
					send("/move/0" + client.getID()+ "/e/", false);
				}else if(ypos < HEIGHT / 3 * 2 && full[1] == false){
					full[1] = true;
					X[1] = true;
					send("/move/1" + client.getID()+ "/e/", false);
				}else if(ypos < HEIGHT && full[2] == false){
					full[2] = true;
					X[2] = true;
					send("/move/2" + client.getID()+ "/e/", false);
				}
			}else if(xpos < WIDTH / 3 * 2){
				if(ypos < HEIGHT / 3 && full[3] == false){
					full[3] = true;
					X[3] = true;
					send("/move/3" + client.getID()+ "/e/", false);
				}else if(ypos < HEIGHT / 3 * 2 && full[4] == false){
					full[4] = true;
					X[4] = true;
					send("/move/4" + client.getID()+ "/e/", false);
				}else if(ypos < HEIGHT && full[5] == false){
					full[5] = true;
					X[5] = true;
					send("/move/5" + client.getID()+ "/e/", false);
				}
			}else if(xpos < WIDTH){
				if(ypos < HEIGHT / 3 && full[6] == false){
					full[6] = true;
					X[6] = true;
					send("/move/6" + client.getID()+ "/e/", false);
				}else if(ypos < HEIGHT / 3 * 2 && full[7] == false){
					full[7] = true;
					X[7] = true;
					send("/move/7" + client.getID()+ "/e/", false);
					
				}else if(ypos < HEIGHT && full[8] == false){
					full[8] = true;
					X[8] = true;
					send("/move/8" + client.getID()+ "/e/", false);
				}
			}
		}
	}
}
