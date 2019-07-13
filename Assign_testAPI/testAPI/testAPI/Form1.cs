/* Author: Durgesh Pachghare
 * Last Edited: 21-06-2019       Pushed to master: YES
 * Description: this program is just for purpose of API testing,no exception handling is done in this
 *              
 * Language Used: C#, Winform on .Net           IDE: Visual Studio Community 2019
 */


using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
namespace testAPI
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Button1_Click(object sender, EventArgs e)
        {
            //https://www1.oanda.com/rates/api/v2/rates/spot.json?api_key=ggeAzjVhxieAUEI5pDdANQUK&base=USD&quote=INR
            string host = "https://www1.oanda.com/rates/";
            string api = "api/v2/rates/spot.json?api_key=ggeAzjVhxieAUEI5pDdANQUK&base=USD&quote=INR";
            var rootObj = Process<RootObject>(host,api);
            foreach (var quote in rootObj.quotes)
            {
                Console.WriteLine("Bid : "+quote.bid+ " Ask: " + quote.ask + "  MidPoint:" + quote.midpoint);
            }
        }
        public TResponse Process<TResponse>(string host, string api)
        {
            // Execute Api call
            var httpResponseMessage = MakeApiCall(host, api);

            // Process Json string result to fetch final deserialized model
            return FetchResult<TResponse>(httpResponseMessage);
        }

        public HttpResponseMessage MakeApiCall(string host, string api)

        {
            // Create HttpClient
            var client = new HttpClient(new HttpClientHandler { UseDefaultCredentials = true }) { BaseAddress = new Uri(host) };
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // Make an API call and receive HttpResponseMessage
            HttpResponseMessage responseMessage = client.GetAsync(api, HttpCompletionOption.ResponseContentRead).GetAwaiter().GetResult();

            return responseMessage;
        }

        public T FetchResult<T>(HttpResponseMessage result)
        {
            if (result.IsSuccessStatusCode)
            {
                // Convert the HttpResponseMessage to string
                var resultArray = result.Content.ReadAsStringAsync().GetAwaiter().GetResult();

                // Json.Net Deserialization
                var final = JsonConvert.DeserializeObject<T>(resultArray);

                return final;
            }
            return default(T);
        }
    }
    public class EffectiveParams
    {
        public string data_set { get; set; }
        public List<string> base_currencies { get; set; }
        public List<string> quote_currencies { get; set; }
    }

    public class Meta
    {
        public EffectiveParams effective_params { get; set; }
        public string endpoint { get; set; }
        public DateTime request_time { get; set; }
        public List<object> skipped_currency_pairs { get; set; }
    }

    public class Quote
    {
        public string base_currency { get; set; }
        public string quote_currency { get; set; }
        public string bid { get; set; }
        public string ask { get; set; }
        public string midpoint { get; set; }
    }

    public class RootObject
    {
        public Meta meta { get; set; }
        public List<Quote> quotes { get; set; }
    }
}
