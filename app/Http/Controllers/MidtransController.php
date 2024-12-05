<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log as FacadesLog;
use Inertia\Inertia;
use Midtrans\Snap;
use Midtrans\Config;

class MidtransController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$clientKey = env('MIDTRANS_CLIENT_KEY');
        Config::$isProduction = false;
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    public function transactionIndex() {
        return Inertia::render('Booking/TestPayment', ['token' => session('token')]);
    }
 
    public function createTransaction(Request $request)
    {
        $transaction_details = [
            'order_id' => uniqid(),
            'gross_amount' => $request->amount,
        ];

        $item_details = [
            [
                'id' => 'item01',
                'price' => $request->amount,
                'quantity' => 1,
                'name' => 'GoPay Payment',
            ],
        ];

        $billing_address = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'address' => 'Jl. Kebon Jeruk No. 1',
            'city' => 'Jakarta',
            'postal_code' => '12345',
            'phone' => '081234567890',
            'country_code' => 'IDN',
        ];

        $customer_details = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'phone' => '081234567890',
            'billing_address' => $billing_address,
        ];

        $transaction_data = [
            'transaction_details' => $transaction_details,
            'item_details' => $item_details,
            'customer_details' => $customer_details,
        ];


        try {
            $snap_token = Snap::getSnapToken($transaction_data);
            session(['token' => $snap_token]);
            return response()->json(['snap_token' => $snap_token]);
        } catch (\Exception $e) {
            $response = json_decode($e->getMessage(), true);
            if (isset($response['status_code']) && $response['status_code'] === '10023') {
                return response()->json(['error' => 'Invalid transaction data or server configuration.']);
            }

            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
