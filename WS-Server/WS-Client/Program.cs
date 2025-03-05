using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

class WebSocketClient
{
    static async Task Main()
    {
        Console.Write("Input name: ");
        string name = Console.ReadLine();

        using var client = new ClientWebSocket();
        Uri serverUri = new Uri($"ws://localhost:6969/ws?name={name}");

        Console.WriteLine("Connecting to server");
        await client.ConnectAsync(serverUri, CancellationToken.None);
        Console.WriteLine("Connected!");

        var receiveTask = ReceiveMessages(client);

        while (client.State == WebSocketState.Open)
        {
            string message = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(message)) continue;

            byte[] buffer = Encoding.UTF8.GetBytes(message);
            await client.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
        }

        await receiveTask;
    }

    static async Task ReceiveMessages(ClientWebSocket client)
    {
        var buffer = new byte[1024 * 4];

        while (client.State == WebSocketState.Open)
        {
            var result = await client.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            if (result.MessageType == WebSocketMessageType.Text)
            {
                string message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                Console.WriteLine(message);
            }
            else if (result.MessageType == WebSocketMessageType.Close)
            {
                await client.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", CancellationToken.None);
            }
        }
    }
}
