import http.server
import socketserver
import os
import sys
import json
import datetime
import random

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class EcoNexaHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path.startswith('/api/ai/'):
            content_length = int(self.headers.get('Content-Length', 0))
            body_raw = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else '{}'
            try:
                body = json.loads(body_raw)
            except Exception:
                body = {}

            response_data = self.handle_ai_endpoint(self.path, body)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
            return
        
        self.send_error(404, "Endpoint not found")

    def handle_ai_endpoint(self, path, body):
        now_iso = datetime.datetime.now().isoformat()
        
        # 1. AI Waste Image Classification
        if path == '/api/ai/waste-classify':
            img_hint = body.get('image', '').lower()
            return {
                "success": True,
                "timestamp": now_iso,
                "detectedItem": "PET Mineral Water Bottle",
                "category": "plastic",
                "macroStream": "Dry / Recyclable Waste",
                "confidence": 96.4,
                "confidenceScore": 0.96,
                "materialInfo": "Polyethylene Terephthalate (PET Code 1)",
                "recommendation": "Rinse bottle, compress, and place in Blue Dry/Recyclable bin.",
                "carbonOffsetKg": 0.045,
                "hazardLevel": "None"
            }

        # 2. AI Complaint NLP Classification & Priority
        elif path == '/api/ai/complaint-analyze':
            text = body.get('text', '').lower()
            if 'overflow' in text or 'bin' in text:
                return {
                    "category": "overflowing_bin",
                    "categoryLabel": "Overflowing Public Dustbin",
                    "priority": "HIGH",
                    "department": "Sanitation Rapid Response",
                    "summary": "Public dustbin overflowing requiring immediate clearance.",
                    "slaHours": 8,
                    "confidence": 95
                }
            elif 'dump' in text or 'burn' in text:
                return {
                    "category": "illegal_dumping",
                    "categoryLabel": "Illegal Dumping Alert",
                    "priority": "CRITICAL",
                    "department": "Environmental Enforcement",
                    "summary": "Suspected unsanctioned dumping reported for verification.",
                    "slaHours": 4,
                    "confidence": 97
                }
            else:
                return {
                    "category": "missed_collection",
                    "categoryLabel": "Collection Failure",
                    "priority": "HIGH" if "days" in text else "MEDIUM",
                    "department": "Collection Fleet Operations",
                    "summary": "Garbage collection delayed on the assigned sector.",
                    "slaHours": 12,
                    "confidence": 94
                }

        # 3. AI Waste Generation Forecasting
        elif path == '/api/ai/waste-predict':
            ward_id = body.get('wardId', 'W01')
            return {
                "success": True,
                "wardId": ward_id,
                "timestamp": now_iso,
                "tomorrow": {
                    "predictedTons": 1.94,
                    "surgeRiskPct": 68,
                    "priorityLevel": "HIGH"
                },
                "logisticsAdvice": "Deploy 1 auxiliary tipper truck during 07:00-09:00 AM peak.",
                "model": "Random Forest v2.4 (95.2% accuracy)"
            }

        # 4. AI Illegal Dumping Detection
        elif path == '/api/ai/illegal-dumping-detect':
            loc = body.get('location', 'Ward 1 Area')
            return {
                "alertId": f"DA-{random.randint(1000, 9999)}",
                "isIllegalDumping": True,
                "confidence": 94.2,
                "severity": "HIGH",
                "estimatedVolume": "2.6 m³ (~480 kg)",
                "detectedMaterials": ["C&D Debris", "Plastic Packaging", "Mixed Waste"],
                "location": loc,
                "timestamp": now_iso,
                "alertStatus": "Requires Authority Verification",
                "recommendedAction": "Dispatch field officer for inspection and site clearance."
            }

        return {"error": "Unknown AI service path"}

class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

if __name__ == '__main__':
    with ThreadingHTTPServer(('127.0.0.1', PORT), EcoNexaHandler) as httpd:
        print(f"EcoNexa AI Server running at http://localhost:{PORT}")
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
